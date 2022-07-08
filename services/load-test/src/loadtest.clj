(ns loadtest
  (:import [java.net URI])
  (:import [java.util Date])
  (:import [java.util.concurrent Executors])
  (:import [org.eclipse.jetty.client HttpClient])
  (:import [org.eclipse.jetty.util.ssl SslContextFactory$Client])
  (:import [org.eclipse.jetty.websocket.api Session])
  (:import [org.eclipse.jetty.websocket.api.annotations 
            OnWebSocketClose OnWebSocketConnect OnWebSocketError OnWebSocketMessage WebSocket])
  (:import [org.eclipse.jetty.websocket.client ClientUpgradeRequest WebSocketClient])
  (:require [clojure.core.async :as async])
  (:require [clojure.string :as str])
  (:gen-class))

(definterface ClientProto
  (^void onconnect [^org.eclipse.jetty.websocket.api.Session session])
  (^void onclose [^int close-code ^String reason])
  (^void onerror [^org.eclipse.jetty.websocket.api.Session session ^Throwable error])
  (^void onmessage [^org.eclipse.jetty.websocket.api.Session session ^String text-message]))

(defrecord
 ^{WebSocket {}}
 Client [machine-id jetty-c log-c]
  ClientProto
  (^{OnWebSocketConnect {}}
    ^void onconnect [this ^org.eclipse.jetty.websocket.api.Session session]
    (async/>!! log-c (str machine-id " connected to server")))
  (^{OnWebSocketClose {}}
    ^void onclose [this ^int close-code ^String reason]
    (async/>!! log-c (str machine-id " server connection closed: " close-code " reason: " reason)))
  (^{OnWebSocketError {}}
    ^void onerror [this ^org.eclipse.jetty.websocket.api.Session session ^Throwable error]
    (async/>!! log-c (str machine-id " server connection error: " error)))
  (^{OnWebSocketMessage {}}
    ^void onmessage [this ^org.eclipse.jetty.websocket.api.Session session ^String text-message]
    (async/put! jetty-c [machine-id session text-message])))

(defn new-jetty-client [ws-client uri jetty-c log-c machine-id]
  (let [jetty-client (Client. machine-id jetty-c log-c)
        request (ClientUpgradeRequest.) ]
    (.connect ws-client jetty-client uri request)
    jetty-client))

(defn launch-loop [launch-c ws-client uri jetty-c log-c]
  (async/go
    (loop []
      (when-let [machine-id (async/<! launch-c)]
        (async/>!! log-c (str "launching " machine-id))
        (new-jetty-client ws-client uri jetty-c log-c machine-id)
        (recur)))
    (async/>!! log-c (str "finished launching machines"))))

(defn simple-stats [machine-id version]
  [:machine-id machine-id
   :camera_port_good 1
   :camera_good 1
   :usb0_good 1
   :usb1_good 1
   :in_a_call 1
   :configured 1
   :version version
   :update_freq 60
   :cpu_current_load "0.1"
   :total_mem 100000000
   :free_mem 90000000
   :used_mem 10000000
   :avail_mem 80000000
   :home_path "/home/telehealth"])

(defn json-string [v]
  (cond
    (string? v) (str \" (str/escape v {\" "\\\""}) \")
    (vector? v) (str \{
                     (str/join \, (map (fn [[k v]] (str (json-string (name k)) \: (json-string v))) (partition 2 v)))
                     \})
    :default v))

(defn action-cable-command [command machine-id]
  [:command command
   :identifier (json-string [:channel "EndpointChannel"
                             :machine_name machine-id])])

(defn action-cable-subscribe [machine-id]
  (json-string (action-cable-command "subscribe" machine-id)))

(defn endpoint-health-stats [machine-id stats]
  (json-string (conj (action-cable-command "message" machine-id)
                     :data (json-string [:action "sync"
                                         :command [:command "health-stats"
                                                   :params stats]]))))

(defn send-text [session text-message]
  (.sendString (.getRemote session) text-message))

(defn action-cable-client [jetty-c subscription-c log-c sessions version]
  (async/go-loop [[machine-id session text-message] (async/<! jetty-c)]
    (when text-message
      (cond
        (str/includes? text-message "\"type\":\"welcome\"")
        (do 
          (async/>!! log-c (str machine-id " received welcome"))
          (send-text session (action-cable-subscribe machine-id)))
        (str/includes? text-message "\"type\":\"ping\"") nil
        (str/includes? text-message "\"type\":\"confirm_subscription\"")
        (do 
          (async/>!! log-c (str machine-id " received subscription confirmation"))
          (swap! sessions assoc machine-id session)
          (async/>! subscription-c machine-id))
        ; change this to a logging message
        :else (async/>!! log-c (str machine-id " received message: " text-message)))
      (recur (async/<! jetty-c)))))

(defn make-even-stats-schedule [machine-ids stats-interval-ms]
  (let [increment (/ stats-interval-ms (count machine-ids))]
    (->> machine-ids
         (map-indexed #(vector (* %1 increment) %2)))))

(defn stats-scheduler [stats-c log-c schedule stats-interval-ms]
  (async/go
    (loop [set-start-time (inst-ms (Date.))]
      (loop [schedule schedule]
        (when-let [entry (first schedule)]
          (let [[start-interval machine-id] entry
                wait-interval (int (- (+ set-start-time start-interval) (inst-ms (Date.))))]
            (when (> wait-interval 0)
              (async/<! (async/timeout wait-interval))
              (async/>!! log-c (str machine-id " waited " wait-interval "ms")))
            (async/>! stats-c machine-id)
            (recur (next schedule)))))
      (let [finish-interval (int (- (+ set-start-time stats-interval-ms) (inst-ms (Date.))))]
        (when (> finish-interval 0)
          (async/<! (async/timeout finish-interval))
          (async/>!! log-c (str "waited " finish-interval "ms to finish set")) )
        (recur (inst-ms (Date.)))))))

(defn stats-loop [stats-c log-c sessions version]
  (async/go
    (loop []
      (let [machine-id (async/<! stats-c)
            session (get @sessions machine-id)]
        (if session
          (do
            (send-text session (endpoint-health-stats machine-id (simple-stats machine-id version)))
            (async/>!! log-c (str "sent stats for " machine-id)))
          (async/>!! log-c (str "stats for " machine-id " pending subscription")))
        (recur)))))

(defn sequential-subscription-launch-scheduler [launch-c subscription-c machine-ids]
  (async/go
    (loop [machine-ids machine-ids]
      (when (seq machine-ids)
        (async/>! launch-c (first machine-ids))
        (let [subscribed-machine-id (async/<! subscription-c)]
          (recur (remove #(= subscribed-machine-id %) machine-ids)))))
    (async/close! launch-c)))

(defn log-loop [log-c]
  (async/go
    (loop []
      (println (async/<! log-c))
      (recur))))

(defn new-ws-client [machine-count]
  (let [http-client (HttpClient. (SslContextFactory$Client.))]
    (.setExecutor http-client (Executors/newFixedThreadPool 2))
    (.setMaxConnectionsPerDestination http-client (+ 6 machine-count))
    (let [ws-client (WebSocketClient. http-client)]
      (.start ws-client)
      ws-client)))

(defn -main [server-url machine-count-str]
  (let [uri (new URI (if (str/starts-with? server-url "ws") server-url (str "wss://" server-url)))
        parse-int (fn [s] (Integer. (re-find #"\d+" s)))
        stats-interval-ms (let [s (System/getenv "STATS_INTERVAL_MS")] (if s (parse-int s) 60000))
        base-machine-id (or (System/getenv "BASE_MACHINE_ID") "stress_test_")
        machine-count (parse-int machine-count-str)
        machine-ids (map #(str base-machine-id %) (range machine-count))
        version (or (System/getenv "MACHINE_VERSION") "1.6")
        ws-client (new-ws-client machine-count)
        log-c (async/chan (async/sliding-buffer 50))
        log-loop-c (log-loop log-c)
        jetty-c (async/chan (+ 10 (* machine-count 2)))
        sessions (atom {})
        subscription-c (async/chan (async/sliding-buffer 10))
        action-cable-c (action-cable-client jetty-c subscription-c log-c sessions version)
        stats-c (async/chan (async/sliding-buffer 5))
        stats-scheduler-c (stats-scheduler stats-c log-c (make-even-stats-schedule machine-ids stats-interval-ms) stats-interval-ms)
        stats-loop-c (stats-loop stats-c log-c sessions version)
        launch-c (async/chan 5)
        launch-scheduler-c (sequential-subscription-launch-scheduler launch-c subscription-c machine-ids)
        launch-loop-c (launch-loop launch-c ws-client uri jetty-c log-c)]
    sessions))

