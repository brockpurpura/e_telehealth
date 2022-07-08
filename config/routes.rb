Rails.application.routes.draw do

  require 'sidekiq/web'

  root 'menus#main'

  #mount ActionCable.server => "/cable"

  devise_for :admins, controllers: {
    sessions: 'admin/sessions',
    registrations: 'admin/registrations',
    confirmations: 'admin/confirmations',
    invitations: 'admin/invitations',
    passwords: 'admin/passwords'
  } 

  devise_scope :admin do
    get '/admins/sign_out' => 'admin/sessions#destroy'
    get '/admins/sign_in' => 'admin/sessions#create'
    post '/admins/sign_in' => 'admin/sessions#create'
    get "/admin" => "admin/sessions#new"
    get '/active'  => 'admin_panel/admins#active'
    get '/timeout' => 'admin_panel/admins#timeout'
  end
 
  devise_for :users, :skip => [:registrations], controllers: {
    sessions: 'user/sessions',
    registrations: 'user/registrations',
    confirmations: 'user/confirmations',
    passwords: 'user/passwords',
    unlocks: 'user/unlocks',
    invitations: 'user/invitations'
  }, :path_names => {:sign_in => 'login', :sign_out => 'logout'}

  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
    patch '/users/confirm' => 'user/confirmations#confirm', :as => :user_confirm
    get '/users/login', to: 'homes#conference'
    get 'users/edit' => 'devise/registrations#edit', :as => 'edit_user_registration'    
    put 'users' => 'devise/registrations#update', :as => 'user_registration'  
  end

  resource :menu do 
    get :main
    post :main
    get :browser_not_supported
    get :site_redirect
  end

  resource :meeting do 
    get 'conference'
    post 'conference'
  end
   
  resource :home do 
    get 'conference'
    post 'conference'
    get 'dial'
    post 'dial'
    get 'check_login'
    post 'check_login'
    post 'lg'
    get 'get_locations'
    get 'get_buildings'
    get 'get_rooms'
    get 'get_endpoints'
    get 'support'
    get 'read_doc'
    get 'update_call_quality_rating'
    post 'update_call_quality_rating'
    get 'update_favorite'
    get 'already_a_favorite'
  end

  resource :observation do 
    get 'get_observer_endpoints_for_customer'
    post 'get_observer_endpoints_for_customer'
    get 'get_obs_locations'
    get 'get_locations'
    get 'get_buildings'
    get 'get_rooms'
    get 'get_endpoints'
    post 'start_observation_session'
    post 'start_room_observation'
    post 'update_room_observation'
    post 'end_room_observation'
    post 'start_observation_activity'
    post 'end_observation_activity'
    post 'refresh_camera_observation_activity'
    post 'record_action'
    post 'transfer_session'
    post 'cancel_transfer_session'
    post 'browser_closed'
    post 'take_over_session'
    post 'assign_transfer_id'
  end

  resource :doc, :path => "docs" do 
    get 'show'
    get 'info'
    get 'call_init'
    get 'making_a_call'
    get 'create_unit'
    get 'compatibility'
    get 'get_units'
    post 'get_units'
    get 'post_alert'
    post 'post_alert'
    get 'end_call'
    get 'call_participants'
    post 'get_permissions'
    get 'get_permissions'
    get 'post_alert'
    post 'post_alert'
  end

  resource :tech do 
    get 'room'
    post 'room'
    get 'support'
  end

  resource :components do
    get 'main'
    post 'main'
    get 'details'
    post 'details'
    get 'add_component'  
    post 'add_component'    
    get 'add_component_type' 
    post 'add_component_type'  
  end

  resource :setting do 
    get 'data_values'
    post 'data_values'
    get 'delete_vmr_now'
    post 'delete_vmr_now'
    get 'get_pexip_themes'
  end

  resource :endpoint do
    post 'send_command_by_machine_name'
    post 'send_command_to_user'
    post 'send_command_to_clinician_user'
    post 'get_endpoint_details'
    post 'text_endpoint_invite'
    get 'internal_check_to_end_call'
    get 'set_as_host'
    get 'remove_as_host'
    get 'remove_as_host_by_vmr_and_user'
    get 'set_end_time'
    post 'set_endpoint'
    post 'adjust_teamviewer'
    post 'adjust_esitter'
    post 'set_audio_video'
    get 'eu'
    post 'eu'
    get 'sign_out_user'
    get 'init_patient'
    post 'init_patient'
    get 'is_endpoint_offline'
    post 'is_endpoint_offline'
    get 'hang_up_all_participants'
    post 'hang_up_all_participants'
    post 'hang_up_participant_by_uuid'
    get 'is_std_endpoint_in_call'
    post 'is_std_endpoint_in_call'
    get 'is_endpoint_in_locked_conf'
    get 'set_bookmark'
    post 'set_bookmark'
    get 'save_bookmark_name'
    post 'save_bookmark_name'
    get 'delete_bookmark'
    post 'delete_bookmark'
    get 'get_alias'
    post 'get_alias'
    get 'get_vmr'
    post 'get_vmr'
    get 'joined_call'
    post 'joined_call'
    get 'joined_meeting'
    post 'joined_meeting'
    get 'check_vmr_for_dups'
    post 'check_vmr_for_dups'
    get 'update_call_list'
    post 'update_call_list'
    get 'get_call_list'
    post 'get_call_list'
    get 'set_icr_state'
    post 'set_icr_state'
  end

  namespace :admin_panel do 
    resource :setting do 
      get 'data_values'
      post 'data_values'
      get 'background'
      post 'background'
      get 'ldap'
      post 'ldap'
      post 'system_alerts'
      get 'system_alerts'
      post 'advanced'
      get 'advanced'
      post 'observer'
      get 'observer'
      get 'super_dev'
      post 'super_dev'
      get 'phone_numbers'
      post 'phone_numbers'
    end
    
    resource :admin do 
      get 'update_maintenance'
      get 'update_is_live'      
      get 'update_acknowledged'
      post 'update_acknowledged'
      get 'send_reset'
      get 'endpoints'
      post 'endpoints'
      get 'get_specialties'
      get 'get_customers'
      get 'get_buildings'
      get 'get_rooms'
      post 'cgas'
      get 'cgas'
      patch 'cgas'
      get 'cgas_mobile'
      post 'cgas_mobile'
      post 'new_login'
      get 'new_login'
      patch 'new_login'
      get 'groups'
      post 'groups'
      patch 'groups'
      get 'customers'
      post 'customers'
      patch 'customers'
      get 'customer_settings'
      post 'customer_settings'
      patch 'customer_settings'
      get 'vmr_report'
      get 'sign_in_report'
      get 'p_halt'
      get 'usage_report'
      post 'usage_report'
      get 'health'
      post 'health'
      get 'support'
      post 'support'
      get 'sign_out_admin'
      get 'update_cga_group'
      get 'update_cga_client'
      get 'ux'
      get 'update_building'
      get 'buildings'
      post 'buildings'
      get 'update_room'      
      get 'rooms'
      post 'rooms'
      get 'add_clients'
      post 'add_clients'
      patch 'add_clients'
      get 'endpoint_settings'
      post 'endpoint_settings'
      patch 'endpoint_settings'
      get 'saved_room_reports'
      post 'saved_room_reports'
      get 'saved_reports'
      post 'saved_reports'
      get 'saved_mobile_reports'
      post 'saved_mobile_reports'
      get 'saved_usage_reports'
      post 'saved_usage_reports'
      get 'reports'
      post 'reports'
      patch 'reports'
      get 'advanced_reports'
      post 'advanced_reports'
      patch 'advanced_reports'
      get 'observation_reports'
      post 'observation_reports'
      get 'observation_report_activities'
      post 'observation_report_activities'
      get 'edit_user'
      post 'edit_user'
      patch 'edit_user' 
      get 'edit_mobile_user'
      post 'edit_mobile_user'
      patch 'edit_mobile_user' 
      get 'edit_user_permissions'
      post 'edit_user_permissions'
      get 'bulk_functions'
      post 'bulk_functions'
      get 'bulk_upload_clinician'
      post 'bulk_upload_clinician'
      get 'bulk_upload_patient'
      post 'bulk_upload_patient'
      get 'example_clinician_csv'
      get 'example_patient_csv'
      get 'fetch_upload_log'
      get 'download_bulk_upload_report'
      post 'iobserver_redirect'
    end
  end

  resource :api do
    get :get_pin
    post :send_epic_status
    get :meeting_started
    post :meeting_started
    post :circuit_reboot_check
    get :update_bookmarks
    post :update_bookmarks
    post :set_pin
    get :set_pin
    post :set_pin
    get :send_alert
    post :send_alert
    get :reboot
    post :reboot
    post :remove_alert
    post :alert_called
    get :check_login
    post :check_login
    get :call
    post :call
    get :join_call
    post :join_call
    get :join_meeting
    post :join_meeting
    get :meeting_self_test
    post :meeting_self_test
    post :send_invite
    post :send_cloudbreak_invite
    post :send_text
    post :cloudbreak_invite
    get :epic_call
    post :epic_call
    get :meeting
    post :meeting
    post :initialize_call
    get :initialize_call
    post :initialize_call
    get :make_keys
    post :end_call
    post :call_participants
    post :get_units
    get :get_units
    post :create_unit
    get :create_unit
    get :add_permissions
    post :add_permissions
    get :add_tech_permissions
    post :add_tech_permissions
    get :remove_permissions
    post :remove_permissions
    get :remove_tech_permissions
    post :remove_tech_permissions
    get :test_alert_url
    post :test_alert_url
    get :license_key
    post :license_key
    post :log_to_syslog
    get :post_alert
    post :post_alert
    post :post_device_error
  end

  get "/fetch_bookmarks" => "homes#select_bookmarks", as: "fetch_bookmarks"
  get "/fetch_participants" => "homes#select_participants", as: "fetch_participants"
  get "/fetch_side_buttons" => "homes#select_side_buttons", as: "fetch_side_buttons"
  get "/fetch_sliders" => "homes#select_sliders", as: "fetch_sliders"
  get "/fetch_room_information" => "observations#select_room_information", as: "fetch_room_information"
  get "/fetch_alert_information" => "observations#select_alert_information", as: "fetch_alert_information"
  get "/fetch_meeting_participants" => "meetings#select_meeting_participants", as: "fetch_meeting_participants"
  get "/fetch_controls" => "homes#select_controls", as: "fetch_controls"
  get "/fetch_conf" => "homes#select_conf", as: "fetch_conf"
  get "/fetch_account" => "homes#select_account", as: "fetch_account"
  get "/fetch_alerts" => "homes#select_alerts", as: "fetch_alerts", via: :options
  get "/fetch_accts_for_client_admin" => 'admin_panel/admins#select_accts_for_client_admin', as: 'fetch_accts_for_client_admin', defaults: { format: 'js' }
  
  get "/fetch_filter_accts_for_client_admin" => 'admin_panel/admins#filter_accts_for_client_admin', as: 'fetch_filter_accts_for_client_admin', defaults: { format: 'js' } 
  get "/fetch_filter_accts_for_customers" => 'admin_panel/admins#filter_accts_for_customers', as: 'fetch_filter_accts_for_customers', defaults: { format: 'js' } 
  get "/fetch_filter_accts_for_groups" => 'admin_panel/admins#filter_accts_for_groups', as: 'fetch_filter_accts_for_groups', defaults: { format: 'js' } 
  get "/fetch_filter_accts_for_buildings" => 'admin_panel/admins#filter_accts_for_buildings', as: 'fetch_filter_accts_for_buildings', defaults: { format: 'js' }  
  get "/fetch_filter_accts_for_rooms" => 'admin_panel/admins#filter_accts_for_rooms', as: 'fetch_filter_accts_for_rooms', defaults: { format: 'js' } 
  get "/fetch_filter_accts_for_endpoints" => 'admin_panel/admins#filter_accts_for_endpoints', as: 'fetch_filter_accts_for_endpoints', defaults: { format: 'js' } 

  get "/fetch_accts_for_clients" => 'admin_panel/admins#select_accts_for_clients', as: 'fetch_accts_for_clients', defaults: { format: 'js' }
  get "/fetch_groups_for_cga" => 'admin_panel/admins#select_groups_for_cga', as: 'fetch_groups_for_cga', defaults: { format: 'js' }
  get "/fetch_client_list" => 'admin_panel/admins#select_client_list', as: 'fetch_client_list', defaults: { format: 'js' }
  get "/fetch_data_for_system_monitor" => 'admin_panel/admins#select_system_monitor_list', as: 'fetch_data_for_system_monitor', defaults: { format: 'js' }
  get "/fetch_user_permissions" => "admin_panel/admins#select_perms", as: 'fetch_user_permissions'
  get "/fetch_admin_permissions" => "admin_panel/admins#select_tech_perms", as: 'fetch_admin_permissions'
  get "/fetch_data_for_system_graph" => 'admin_panel/admins#select_system_graph', as: 'fetch_data_for_system_graph', defaults: { format: 'js' }
  get "/fetch_data_for_system_graph_cga" => 'admin_panel/admins#select_system_graph_cga', as: 'fetch_data_for_system_graph_cga', defaults: { format: 'js' }
  get "/fetch_data_for_system_monitor_cga" => 'admin_panel/admins#select_system_monitor_list_cga', as: 'fetch_data_for_system_monitor_cga', defaults: { format: 'js' }
  get "/fetch_data_for_system_graph_admin" => 'admin_panel/admins#select_system_graph_admin', as: 'fetch_data_for_system_graph_admin', defaults: { format: 'js' }
  get "/fetch_data_for_system_monitor_admin" => 'admin_panel/admins#select_system_monitor_list_admin', as: 'fetch_data_for_system_monitor_admin', defaults: { format: 'js' }

  match 'active'  => 'admin_panel/admins#active',  via: :get
  match 'timeout' => 'admin_panel/admins#timeout', via: :get 

  match "/404" => "errors#error404", via: [ :get, :post, :patch, :delete ]
  match "/500" => "errors#error500", via: [ :get, :post, :patch, :delete ]
  
  
  constraint = lambda do |request|
    request.env['warden'].authenticate!({ scope: :admin })
  end

  authenticate :admin, lambda { |u| u.is_super_admin? }  do
    mount Sidekiq::Web => '/uvsk'
  end

  get "/api/encrypted_call" => 'apis#epic_call', as: 'encrypted_call' 

  post "/api/tigrpx_webhook" => 'apis#tigrpx_webhook', as: 'tigrpx_webhook'
  post '/api/start_tytocare_exam' => 'apis#start_tytocare_exam', as: 'start_tytocare_exam'
  post '/api/end_tytocare_exam' => 'apis#end_tytocare_exam', as: 'end_tytocare_exam'

  # API for e.g. mobile app manipulation of room controls
  scope '/api' do
    scope '/v2' do 
      scope '/units' do
        get '/' => 'uhe_api/api_rooms#get_units_paginated'
      end
    end
    scope '/v1' do
      scope '/_____login_system__' do
        post '/' => 'uhe_api/api_authentication#authenticate_system', as: 'login_system'
      end
      scope '/login' do 
        post '/' => 'uhe_api/api_authentication#authenticate', as: 'login_user'
      end
      scope '/login_mdm' do 
        post '/' => 'uhe_api/api_authentication#authenticate_mdm'
      end
      scope '/login_sso' do 
        post '/' => 'uhe_api/api_authentication#authenticate_sso'
      end
      scope '/refresh_token' do 
        post '/' => 'uhe_api/api_authentication#refresh_token', as: 'refresh_token'
      end
      scope '/units' do
        get '/' => 'uhe_api/api_rooms#get_units'
      end
      scope '/rooms' do
        get '/' => 'uhe_api/api_rooms#index'
        scope '/control' do
          post '/' => 'uhe_api/api_rooms#control', as: 'control_endpoint'
        end
      end
      scope '/vmr' do
        post '/' => 'uhe_api/api_rooms#vmr'
      end
      scope '/allocate_vmr_meeting' do
        post '/' => 'uhe_api/api_rooms#vmr_meeting_alias_from_pool', as: 'allocate_vmr_meeting'
      end
      scope '/expire_vmr_meeting' do
        post '/' => 'uhe_api/api_rooms#vmr_meeting_expire', as: 'expire_vmr_meeting'
      end
      scope '/expire_invites' do
        post '/' => 'uhe_api/api_rooms#expire_invites_for_user'
      end
      scope '/alias_from_call_token' do
        post '/' => 'uhe_api/api_rooms#alias_from_call_token'
      end
      scope '/update_user_phone_number' do
        post '/' => 'uhe_api/api_rooms#update_user_phone_number'
      end
      scope '/cameras' do 
        get '/' => 'uhe_api/api_rooms#customers'
        scope ':customer', :constraints  => { :customer =>  /[^\/]+/ } do 
          get '/' => 'uhe_api/api_rooms#building'
          scope ':location', :constraints  => { :location =>  /[^\/]+/ } do 
            get '/' => 'uhe_api/api_rooms#location'
            scope ':room', :constraints  => { :room =>  /[^\/]+/ } do 
              get '/' => 'uhe_api/api_rooms#room'
            end
          end
        end
      end
      # New approach at filtering down the heirarchy which also includes channels
      scope '/channels' do
        get '/' => 'uhe_api/api_rooms#user_channels'
        scope ':channel/customers' do
          get '/' => 'uhe_api/api_rooms#user_customers'
          scope ':customer/locations' do
            get '/' => 'uhe_api/api_rooms#user_locations'
            scope ':location/rooms' do
              get '/' => 'uhe_api/api_rooms#user_rooms'
              scope ':room/units' do
                get '/' => 'uhe_api/api_rooms#user_units'
              end
            end
          end
        end
      end
      scope '/profile' do 
        post '/' => 'uhe_api/api_rooms#profile'
      end
      scope '/translator' do 
        get '/' => 'uhe_api/api_rooms#translator', as: 'get_translator'
      end
      scope '/formatted_clinician_display' do 
        post '/'=> 'uhe_api/api_rooms#formatted_clinician_display', as: 'formatted_clinician_display'
      end
    end
  end

  # Paths which take a JWT token and auto-login the user to a particular location
  get '/login_sso' => 'uhe_api/api_authentication#login_sso'
  get '/clinician_sso' => 'uhe_api/api_authentication#clinician_sso'
  get '/iobserver_sso' => 'uhe_api/api_authentication#iobserver_sso'

  # Login and Logout paths for cloud deployments using the SSO system
  get "/sso_login"  => redirect(Configurable.sso_login_url)
  get "/sso_logout" => redirect(Configurable.sso_logout_url)

  # TytoCare
  get "/tyto_popup" => 'apis#tytocare_popup', as: 'tytocare_popup'

  # Philips iFrame
  get "/philips_iframe" => 'apis#philips_iframe', as: 'philips_iframe'

end
