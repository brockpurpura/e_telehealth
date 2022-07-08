FROM ubuntu:16.04
RUN apt-get update -qq && apt-get install -y rsyslog
COPY rsyslog.conf /etc/
COPY 50-default.conf /etc/rsyslog.d/
EXPOSE 514
ENTRYPOINT ["/usr/sbin/rsyslogd", "-n"]
