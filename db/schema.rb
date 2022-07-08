# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20210728154000) do

  create_table "admins", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "approved", default: 1
    t.integer "authorized", default: 0
    t.integer "role_type", default: 1
    t.integer "client_id"
    t.integer "client_admin_id"
    t.string "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer "invitation_limit"
    t.string "invited_by_type"
    t.bigint "invited_by_id"
    t.integer "invitations_count", default: 0
    t.integer "default_admin", default: 0
    t.string "phone_number"
    t.string "first_name"
    t.string "last_name"
    t.string "country_phone_abbv", default: "us"
    t.string "prefix"
    t.integer "allow_demo", default: 0
    t.string "n_audio"
    t.string "n_video"
    t.string "n_speaker"
    t.integer "should_timeout", default: 0
    t.integer "tech_approved", default: 0
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.boolean "is_mobile_user", default: false, null: false
    t.string "mobile_role"
    t.string "mobile_specialty"
    t.integer "mobile_location_id"
    t.integer "mobile_unit_id"
    t.string "mobile_alias"
    t.string "mobile_notification_url"
    t.integer "migrated", default: 0
    t.index ["client_admin_id"], name: "index_admins_on_client_admin_id"
    t.index ["client_id"], name: "index_admins_on_client_id"
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["invitation_token"], name: "index_admins_on_invitation_token", unique: true
    t.index ["invitations_count"], name: "index_admins_on_invitations_count"
    t.index ["invited_by_id"], name: "index_admins_on_invited_by_id"
    t.index ["invited_by_type", "invited_by_id"], name: "index_admins_on_invited_by_type_and_invited_by_id"
    t.index ["is_mobile_user"], name: "index_admins_on_is_mobile_user"
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_admins_on_unlock_token", unique: true
  end

  create_table "admins_to_clients", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "admin_id"
    t.integer "client_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_id", "client_id"], name: "index_admins_to_clients_on_admin_id_and_client_id"
  end

  create_table "alert_frequencies", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "endpoint_id"
    t.datetime "a_last_call"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["endpoint_id"], name: "index_alert_frequencies_on_endpoint_id"
  end

  create_table "ap_endpoints_details", id: :bigint, default: nil, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.binary "customer_auto_notification", limit: 1
    t.string "device_config_mode", limit: 20
  end

  create_table "api_alerts", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "endpoint_id"
    t.string "alert_instance"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["endpoint_id", "alert_instance"], name: "index_api_alerts_on_endpoint_id_and_alert_instance"
  end

  create_table "api_calls", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "client_id"
    t.string "call_token"
    t.text "call_params"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "endpoint_id"
    t.integer "vmr_id"
    t.index ["call_token"], name: "index_api_calls_on_call_token"
    t.index ["client_id", "call_token"], name: "index_api_calls_on_client_id_and_call_token"
  end

  create_table "api_keys", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "client_id"
    t.string "name"
    t.string "password_digest"
    t.string "elert_callback"
    t.string "hangup_callback"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "api_username"
    t.string "api_password"
    t.string "api_encrypt_key"
    t.string "role_prefix"
    t.string "ldap_admin_group"
    t.string "ldap_clinician_group"
    t.string "ldap_observer_group"
    t.string "ldap_technician_group"
    t.string "ldap_readonly_group"
    t.integer "deleted", default: 0
    t.index ["api_username", "api_password"], name: "index_api_keys_on_api_username_and_api_password"
    t.index ["client_id"], name: "index_api_keys_on_client_id"
  end

  create_table "batch_rows", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "batch_id"
    t.string "status"
    t.text "data"
    t.string "file_row"
    t.string "report"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "batches", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "status"
    t.string "total_records"
    t.string "succeeded_count"
    t.string "failed_count"
    t.string "original_filename"
    t.string "source_file"
    t.string "import_type"
    t.integer "admin_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bookmarks", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "endpoint_id"
    t.integer "user_id"
    t.string "name"
    t.string "internal_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["endpoint_id", "user_id"], name: "index_bookmarks_on_endpoint_id_and_user_id"
    t.index ["endpoint_id"], name: "index_bookmarks_on_endpoint_id"
    t.index ["name"], name: "index_bookmarks_on_name"
  end

  create_table "buildings", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "address1"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "location_id"
    t.integer "status"
    t.index ["location_id", "id"], name: "index_buildings_on_location_id_and_id"
    t.index ["location_id"], name: "index_buildings_on_location_id"
  end

  create_table "bulk_commands", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "endpoint_id"
    t.string "command_name"
    t.integer "waiting_to_run", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["endpoint_id", "command_name", "waiting_to_run"], name: "waiting_to_run_index"
    t.index ["endpoint_id", "command_name"], name: "index_bulk_commands_on_endpoint_id_and_command_name"
  end

  create_table "call_participants", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "vmr_id"
    t.integer "user_id"
    t.string "p_uuid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "invited", default: 0
    t.integer "api", default: 0
    t.integer "current_host", default: 0
    t.string "display_name"
    t.index ["p_uuid"], name: "index_call_participants_on_p_uuid"
    t.index ["vmr_id", "user_id"], name: "index_call_participants_on_vmr_id_and_user_id"
  end

  create_table "camera_commands", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "endpoint_id"
    t.string "command_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "client_admin_api_keys", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "client_admin_id"
    t.string "role_prefix"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "ldap_admin_group"
  end

  create_table "client_admins", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.integer "status", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "use_layerx", default: 0
    t.string "layerx_username"
    t.string "layerx_dashboard_id"
    t.integer "auto_reboot", default: 0
    t.integer "hide_wifi_pw", default: 0
    t.integer "show_wifi_tech", default: 0
  end

  create_table "client_attribute_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name_tag"
    t.string "title_display"
    t.integer "group_no"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "send_to_device"
    t.integer "is_boolean", default: 0
    t.boolean "force_editable"
  end

  create_table "client_attributes", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "client_id"
    t.integer "client_attribute_type_id"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "clients", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "client_name"
    t.integer "status", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "client_admin_id"
    t.integer "translation_type_id", default: 0
    t.integer "use_layerx", default: 0
    t.string "layerx_username"
    t.string "layerx_dashboard_id"
    t.string "esitter_controller"
    t.string "interconnect_server"
    t.string "interconnect_username"
    t.string "interconnect_password"
    t.string "translation_customer_code"
    t.string "group_turn_server_name"
    t.integer "clinician_sidebutton_layout", default: 0
    t.integer "auto_reboot", default: 0
    t.string "perfectserve_url"
    t.integer "content_sharing_enabled", default: 0
    t.integer "screenshot_enabled", default: 1
    t.index ["client_admin_id"], name: "index_clients_on_client_admin_id"
  end

  create_table "component_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "components", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "endpoint_id"
    t.string "part_type"
    t.string "image_type"
    t.string "upc"
    t.datetime "retired_at"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["endpoint_id"], name: "index_components_on_endpoint_id"
  end

  create_table "configurables", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_configurables_on_name"
  end

  create_table "delayed_jobs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "priority", default: 0, null: false
    t.integer "attempts", default: 0, null: false
    t.text "handler", null: false
    t.text "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string "locked_by"
    t.string "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority"
  end

  create_table "device_type_names", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "common_name"
    t.string "standard_device_type"
    t.integer "active", default: 1
    t.integer "list_priority", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "camera_brightness_adjustment"
    t.boolean "camera_focus_adjustment"
    t.boolean "nightview"
    t.boolean "can_hard_reboot"
    t.boolean "has_sony_camera"
    t.boolean "active_device_type"
    t.boolean "has_battery"
  end

  create_table "encrypted_apis", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "encrypted_string"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "endpoint_attribute_type_values", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "endpoint_attribute_type_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["endpoint_attribute_type_id"], name: "endp_a_t_v_on_end_a_t_id"
  end

  create_table "endpoint_attribute_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "send_to_device"
    t.integer "group_no"
    t.string "name_tag"
    t.integer "is_boolean", default: 0
  end

  create_table "endpoint_attributes", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "endpoint_id"
    t.integer "endpoint_attribute_type_id"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "endpoint_hardwares", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "endpoint_id"
    t.text "devices"
    t.string "camera"
    t.string "relay_board"
    t.string "audio"
    t.string "touch_screen"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "machine_serial_number"
    t.string "machine_os"
    t.string "machine_dist"
    t.string "machine_codename"
    t.string "machine_release"
    t.string "hostname"
    t.string "system_vin"
    t.index ["endpoint_id"], name: "index_endpoint_hardwares_on_endpoint_id"
  end

  create_table "endpoint_statuses", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "endpoint_id"
    t.integer "connect_good", default: 0
    t.integer "camera_good", default: 0
    t.integer "usb0_good", default: 0
    t.integer "usb1_good", default: 0
    t.integer "in_a_call", default: 0
    t.integer "configured", default: 0
    t.integer "update_freq"
    t.string "version"
    t.datetime "configured_date"
    t.datetime "last_update_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "machine_id"
    t.float "cpu_current_load", limit: 24
    t.float "total_mem", limit: 24
    t.float "free_mem", limit: 24
    t.float "used_mem", limit: 24
    t.float "avail_mem", limit: 24
    t.integer "camera_port_good", default: 0
    t.integer "wifi_enabled", default: 0
    t.string "home_path"
    t.integer "error_weight", default: 0
    t.datetime "camera_alert_time"
    t.integer "camera_alert_sent", default: 0
    t.datetime "visca_alert_time"
    t.integer "visca_alert_sent", default: 0
    t.string "wifi_cert_status"
    t.string "general_status"
    t.index ["endpoint_id"], name: "index_endpoint_statuses_on_endpoint_id"
  end

  create_table "endpoints", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "room_id"
    t.string "name"
    t.string "alias"
    t.string "protocol"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "pin"
    t.string "endpoint_type"
    t.string "tunnel"
    t.string "machine_name"
    t.string "local_ip"
    t.integer "under_maintenance", default: 0
    t.string "conference_node"
    t.float "default_input", limit: 24, default: 6.0
    t.float "default_output", limit: 24, default: 5.0
    t.integer "show_icr", default: 1
    t.integer "show_camera", default: 1
    t.integer "allow_privacy", default: 1
    t.string "elert_url"
    t.float "default_bell", limit: 24, default: 5.0
    t.string "ip4v"
    t.string "netmask"
    t.string "gateway"
    t.integer "static_ip_status"
    t.integer "status"
    t.string "preferred_dns"
    t.string "alternate_dns"
    t.string "dial_out_type", default: "SIP"
    t.integer "teamviewer_on", default: 0
    t.integer "esitter_on", default: 1
    t.string "wifi_device_id"
    t.string "ssid"
    t.string "ssid_password"
    t.integer "wifi_status"
    t.integer "default_speed", default: 5
    t.string "enterprise_network_name"
    t.string "enterprise_username"
    t.string "enterprise_password"
    t.string "enterprise_auth"
    t.string "enterprise_inner_auth"
    t.integer "acknowledged_id"
    t.text "notes"
    t.integer "is_live", default: 1
    t.string "device_common_name"
    t.index ["pin", "machine_name"], name: "index_endpoints_on_pin_and_machine_name"
    t.index ["room_id", "id"], name: "index_endpoints_on_room_id_and_id"
    t.index ["room_id"], name: "index_endpoints_on_room_id"
  end

  create_table "epic_api_results", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "vmr_meeting_id"
    t.string "cid"
    t.string "ext_user_id"
    t.string "usertype"
    t.string "vendor_name"
    t.string "connect_status"
    t.string "api_result"
    t.string "api_message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cid", "api_result", "connect_status"], name: "cid_result_status_idx"
  end

  create_table "favorites", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "user_id"
    t.integer "endpoint_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "icons", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "attachment"
    t.integer "client_id"
    t.integer "status"
    t.string "banner_color"
    t.string "font_color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "client_admin_id"
    t.index ["client_admin_id"], name: "index_icons_on_client_admin_id"
    t.index ["client_id"], name: "index_icons_on_client_id"
  end

  create_table "invite_calls", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "vmr_id"
    t.integer "user_id"
    t.string "call_token"
    t.string "invite_email"
    t.integer "expire_amount", default: 30
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["call_token"], name: "index_invite_calls_on_call_token"
  end

  create_table "invite_meeting_calls", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "vmr_meeting_id"
    t.integer "user_id"
    t.string "call_token"
    t.string "invite_email"
    t.integer "expire_amount", default: 30
    t.integer "client_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_one_time"
    t.index ["call_token"], name: "index_invite_meeting_calls_on_call_token"
  end

  create_table "licenses", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.text "license_type"
    t.text "license_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "locations", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "client_id"
    t.string "name"
    t.string "address1"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id", "id"], name: "index_locations_on_client_id_and_id"
    t.index ["client_id"], name: "index_locations_on_client_id"
  end

  create_table "meeting_participants", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "vmr_meeting_id"
    t.integer "user_id"
    t.string "usertype"
    t.string "org_id"
    t.string "cid"
    t.datetime "appt_time"
    t.string "p_uuid"
    t.string "display_name"
    t.integer "invited", default: 0
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "call_quality_rating"
    t.index ["vmr_meeting_id", "user_id", "p_uuid"], name: "index_for_duplicate_search"
  end

  create_table "notifications", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "user_id"
    t.integer "endpoint_id"
    t.string "message"
    t.string "room_info"
    t.integer "status", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "answered_user_id"
    t.string "unique_api_id"
    t.index ["answered_user_id", "created_at"], name: "index_notifications_on_answered_user_id_and_created_at"
    t.index ["created_at"], name: "index_notifications_on_created_at"
    t.index ["endpoint_id", "answered_user_id"], name: "index_notifications_on_endpoint_id_and_answered_user_id"
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "observation_activities", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "observation_id"
    t.string "activity_type"
    t.string "reason"
    t.integer "admin_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.timestamp "end_time"
  end

  create_table "observation_sessions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "admin_id"
    t.string "admin_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "observations", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "endpoint_id"
    t.integer "admin_id"
    t.datetime "start_time"
    t.datetime "end_time"
    t.integer "transferred", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "clean_up_date"
    t.integer "transfer_observation_id"
    t.integer "transferred_admin_id"
    t.string "transfer_reason"
    t.integer "transfer_id"
    t.integer "observation_session_id"
  end

  create_table "observers_to_clients", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "admin_id"
    t.integer "client_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "phone_numbers", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "number"
    t.string "dial_code"
    t.string "flag_code"
    t.string "format"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reboot_requests", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "endpoint_id"
    t.integer "reboot_request", default: 1
    t.integer "reboot_answered", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reports", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "admin_id"
    t.string "report_url"
    t.integer "active", default: 1
    t.string "report_desc"
    t.string "report_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "role_mappings", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "system_role"
    t.string "third_party_role"
    t.string "third_party_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "admin_id"
    t.string "role_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rooms", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "building_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status"
    t.index ["building_id", "id"], name: "index_rooms_on_building_id_and_id"
    t.index ["building_id"], name: "index_rooms_on_building_id"
  end

  create_table "settings", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "user_id"
    t.integer "volume"
    t.integer "brightness"
    t.integer "speed"
    t.integer "privacy"
    t.integer "announce"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_settings_on_user_id"
  end

  create_table "small_urls", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "large_url"
    t.string "small_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "support_sections", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "supports", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "document"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "support_section_id"
  end

  create_table "system_alert_emails", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "client_id"
    t.integer "alert_number"
    t.integer "alert_level"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "system_status_histories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "endpoint_id"
    t.string "change_subject"
    t.string "change_message"
    t.integer "alert_status", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "themes", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "theme_id"
    t.string "name"
    t.string "uri"
    t.string "uuid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "total_call_list_participants", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "vmr_id"
    t.string "p_uuid"
    t.string "display_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transfers", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "requesting_admin_id"
    t.integer "answer_admin_id"
    t.string "reason"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "translation_codes", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "translation_type_id"
    t.string "name"
    t.string "gender"
    t.string "prefix"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "skill"
  end

  create_table "translation_mappings", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "translation_type_id"
    t.integer "client_id"
    t.string "uri"
    t.string "description"
    t.string "gender"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "translation_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.integer "use_domain"
    t.integer "use_gender"
    t.string "domain"
    t.string "male", default: "-1"
    t.string "female", default: "-1"
    t.string "any", default: "-1"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "use_skill", default: 0
    t.integer "use_mapping", default: 0
  end

  create_table "tutorials", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "youtube_path"
    t.string "video_description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tyto_care_stations", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "station_id"
    t.string "tyto_visit_id"
    t.integer "endpoint_id"
    t.integer "clinician_id"
    t.string "device_serial_number"
    t.string "public_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "unit_histories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "unit_id"
    t.integer "endpoint_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "units", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "main_enclosure_tag"
    t.string "lower_enclosure_tag"
    t.integer "endpoint_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "teamviewer"
    t.string "internal_ip"
  end

  create_table "user_phones", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "user_id"
    t.string "cell_phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "country_phone_abbv", default: "us"
    t.index ["user_id"], name: "index_user_phones_on_user_id"
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "prefix"
    t.string "first_name"
    t.string "last_name"
    t.integer "client_id"
    t.string "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer "invitation_limit"
    t.string "invited_by_type"
    t.bigint "invited_by_id"
    t.integer "invitations_count", default: 0
    t.string "display_name"
    t.string "api_unique", default: "-1"
    t.string "d_audio"
    t.string "d_video"
    t.string "d_speaker"
    t.integer "text_flag", default: 1
    t.string "n_audio"
    t.string "n_video"
    t.string "n_speaker"
    t.integer "matched_admin_id"
    t.index ["client_id"], name: "index_users_on_client_id"
    t.index ["display_name", "api_unique"], name: "index_users_on_display_name_and_api_unique"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["invitation_token"], name: "index_users_on_invitation_token", unique: true
    t.index ["invitations_count"], name: "index_users_on_invitations_count"
    t.index ["invited_by_id"], name: "index_users_on_invited_by_id"
    t.index ["invited_by_type", "invited_by_id"], name: "index_users_on_invited_by_type_and_invited_by_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "users_to_clients", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "user_id"
    t.integer "client_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "client_id"], name: "index_users_to_clients_on_user_id_and_client_id"
  end

  create_table "version_releases", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "endpoint_id"
    t.string "version"
    t.integer "try_count", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "vmr_meetings", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "uri"
    t.string "alias"
    t.datetime "destroyed_at"
    t.integer "on_deck", default: 1
    t.integer "client_id"
    t.string "used_by_cid"
    t.datetime "appt_time"
    t.integer "set_info", default: 0
    t.string "call_token"
    t.datetime "start_time"
    t.datetime "end_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "client_admin_id"
    t.string "appt_time_str"
    t.string "host_pin", default: "0"
    t.string "guest_pin", default: "0"
    t.boolean "is_mobile"
    t.string "endpoint_id"
    t.index ["on_deck", "set_info", "client_admin_id"], name: "index_vmr_meetings_on_on_deck_and_set_info_and_client_admin_id"
  end

  create_table "vmrs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "uri"
    t.string "alias"
    t.datetime "destroyed_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "on_deck", default: 1
    t.integer "used_by"
    t.integer "set_info", default: 0
    t.integer "endpoint_id"
    t.string "call_token"
    t.datetime "start_time"
    t.datetime "end_time"
    t.integer "icr_state", default: 0
    t.integer "client_admin_id"
    t.boolean "is_api"
    t.string "host_pin", default: "0"
    t.string "guest_pin", default: "0"
    t.index ["alias"], name: "index_vmrs_on_alias"
    t.index ["on_deck", "set_info", "client_admin_id"], name: "index_vmrs_on_on_deck_and_set_info_and_client_admin_id"
    t.index ["on_deck", "set_info"], name: "index_vmrs_on_on_deck_and_set_info"
    t.index ["used_by"], name: "index_vmrs_on_used_by"
  end

  create_table "websocket_commands", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "batch_name"
    t.integer "endpoint_id"
    t.string "command"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["batch_name", "endpoint_id"], name: "index_websocket_commands_on_batch_name_and_endpoint_id"
  end

  add_foreign_key "endpoint_attribute_type_values", "endpoint_attribute_types"
end
