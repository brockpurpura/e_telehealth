# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

## Initialize Client Attribute Table
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'eko_api_key')
record.title_display = 'EKO API Key'
record.group_no = 1
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'eko_secret_key')
record.title_display = 'EKO Secret Key'
record.group_no = 1
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'soft_reboot_option')
record.title_display = 'Allow Clinician Soft Reboot'
record.group_no = 1
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'getwell_base_url')
record.title_display = 'Getwell URL with protocol'
record.group_no = 1
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'play_doorbell')
record.title_display = 'Auto Doorbell (default: false)'
record.group_no = 1
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'getwell_api_workflow_path')
record.title_display = 'Getwell API Path'
record.group_no = 1
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'getwell_system_name')
record.title_display = 'Getwell System Name'
record.group_no = 1
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'getwell_api_token_path')
record.title_display = 'Getwell API token path'
record.group_no = 1
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'getwell_client_id')
record.title_display = 'Getwell Client ID'
record.group_no = 1
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'getwell_client_secret')
record.title_display = 'Getwell Client Secret'
record.group_no = 1
record.send_to_device = 1
record.save!

record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'EC')
record.description = 'Echo Cancellation'
record.group_no = 1
record.send_to_device = 1
record.is_boolean = 0
record.save!

record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'withhold_notifications')
record.description = 'Withhold Notifications'
record.group_no = 1
record.send_to_device = 0
record.is_boolean = 1
record.save!

record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'unit_selfview')
record.description = 'Show Patient SelfView'
record.group_no = 1
record.send_to_device = 1
record.is_boolean = 1
record.save!

record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'disable_bluetooth')
record.description = 'Disable Bluetooth'
record.group_no = 1
record.send_to_device = 1
record.is_boolean = 1
record.save!

record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'eko_enabled')
record.description = 'EKO Integration'
record.group_no = 2
record.send_to_device = 1
record.is_boolean = 1
record.save!
record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'epic_alert_url')
record.description = 'EPIC PatientEvent alert URL (API call)'
record.group_no = 1
record.send_to_device = 1
record.is_boolean = 0
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'patient_reinvite_time_in_sec')
record.title_display = 'Seconds before reinviting patient to call (default 8)'
record.group_no = 2
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'clinician_wait_period')
record.title_display = 'Milliseconds before deciding clinician is not going to join a call after initial request (default 2000)'
record.group_no = 2
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'mobile_bandwidth')
record.title_display = 'Mobile Bandwidth in kbps (default 1280)'
record.group_no = 3
record.send_to_device = 1
record.save!

# Remove for now
#record = ClientAttributeType.find_or_initialize_by(:name_tag => 'waiting_room')
#record.title_display = 'Clinician guest waiting room (default false)'
#record.group_no = 4
#record.send_to_device = 1
#record.save!


# INC-361 - asked to be removed
#record = ClientAttributeType.find_or_initialize_by(:name_tag => 'epic_muted')
#record.title_display = 'Epic (encrypt) in-patient API join as muted (default false)'
#record.group_no = 4
#record.send_to_device = 1
#record.save!

record = SupportSection.find_or_initialize_by(:name => 'Install')
record.save!

record = SupportSection.find_or_initialize_by(:name => 'Patches')
record.save!

record = SupportSection.find_or_initialize_by(:name => 'Schematics')
record.save!

record = SupportSection.find_or_initialize_by(:name => 'Spec Sheets')
record.save!

record = SupportSection.find_or_initialize_by(:name => 'Troubleshooting')
record.save!

record = SupportSection.find_or_initialize_by(:name => 'Updates')
record.save!

record = SupportSection.find_or_initialize_by(:name => 'User Guides')
record.save!

self_test_meeting_ca_record = ClientAdmin.find_or_initialize_by(:name => 'Meeting SelfTest')
self_test_meeting_ca_record.status = 1
self_test_meeting_ca_record.save!

mobile_channel = ClientAdmin.find_or_initialize_by(:name => 'mobile_channel')
mobile_channel.created_at = DateTime.now
mobile_channel.updated_at = DateTime.now
mobile_channel.save!

mobile_client = mobile_channel.clients.find_or_initialize_by(:client_name => 'mobile_client')
mobile_client.created_at = DateTime.now
mobile_client.updated_at = DateTime.now
mobile_client.save!

self_test_meeting_c_record = Client.find_or_initialize_by(:client_name => 'Meeting SelfTest Customer')
self_test_meeting_c_record.status = 1
self_test_meeting_c_record.client_admin_id = self_test_meeting_ca_record.id
self_test_meeting_c_record.save!

on_prem = Configurable.find_by(:name => 'on_prem')
if on_prem and on_prem.value == 1
  use_sso = Configurable.find_or_initialize_by(:name => 'use_sso')
  use_sso.value = 0
  use_sso.save!

  trp = Configurable.find_or_initialize_by(:name => 'trp_redirect_url')
  trp.value = 'https://ioapireports.care2.evn.va.gov/auth/third-party-auth/caregility/'
  trp.save!
end 

# New Client Attribute for Cloudbreak
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'cloudbreak_id')
record.title_display = 'Cloudbreak (Martti) ID'
record.group_no = 1
record.send_to_device = 0
record.force_editable = 1
record.save!

# New translation type for Cloudbreak
record = TranslationType.find_or_initialize_by(:name => 'Cloudbreak')
record.use_mapping = 2
record.translation_codes << TranslationCode.find_or_initialize_by(:translation_type => record, :name => 'Spanish')
record.translation_codes << TranslationCode.find_or_initialize_by(:translation_type => record, :name => 'Arabic')
record.translation_codes << TranslationCode.find_or_initialize_by(:translation_type => record, :name => 'ASL')
record.translation_codes << TranslationCode.find_or_initialize_by(:translation_type => record, :name => 'Russian')
record.translation_codes << TranslationCode.find_or_initialize_by(:translation_type => record, :name => 'Mandarin')
record.translation_codes << TranslationCode.find_or_initialize_by(:translation_type => record, :name => 'Vietnamese')
record.translation_codes << TranslationCode.find_or_initialize_by(:translation_type => record, :name => 'Somali')
record.translation_codes << TranslationCode.find_or_initialize_by(:translation_type => record, :name => 'Nepali')
record.translation_codes << TranslationCode.find_or_initialize_by(:translation_type => record, :name => 'Cantonese')
record.translation_codes << TranslationCode.find_or_initialize_by(:translation_type => record, :name => 'French')
record.translation_codes << TranslationCode.find_or_initialize_by(:translation_type => record, :name => 'Operator')
record.save!

# New Client Attribute for Notification Portal access by Client
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'notification_portal_enabled')
record.title_display = 'Notification Portal Enabled (TRUE[default]|FALSE)'
record.group_no = 1
record.send_to_device = 0
record.force_editable = 1
record.save!

# New Client Attribute for JAMF enabled Customers
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'jamf_enabled')
record.title_display = 'JAMF access (TRUE|FALSE[default])'
record.group_no = 1
record.send_to_device = 0
record.force_editable = 1
record.save!

# New translation type for PSTN Translator Invite
record = TranslationType.find_or_initialize_by(:name => 'Language Line PSTN')
record.use_mapping = 3
record.save!

# New Client Attribute for MyChart Participant Invite link expiry time
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'mychart_participant_invite_expiry_time')
record.title_display = 'MyChart participant invite expiry (minutes)'
record.group_no = 1
record.send_to_device = 0
record.force_editable = 1
record.save!

# New Client Attribute for POH block incoming video and sound
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'poh_block_incoming')
record.title_display = 'POH blocks patient sound (TRUE|FALSE[default])'
record.group_no = 1
record.is_boolean = 1
record.send_to_device = 1
record.save!

# New Client Attribute for POH block incoming video and sound
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'lock_vmrs')
record.title_display = 'Clinician ability to Lock VMRs (TRUE|FALSE[default])'
record.group_no = 1
record.is_boolean = 1
record.send_to_device = 1
record.save!

# New Component Types 
component_type = ComponentType.find_or_initialize_by(:name => 'Upper Enclosure')
component_type.save!

component_type = ComponentType.find_or_initialize_by(:name => 'Lower Enclosure')
component_type.save!

component_type = ComponentType.find_or_initialize_by(:name => 'Computer')
component_type.save!

component_type = ComponentType.find_or_initialize_by(:name => 'PTZ Camera')
component_type.save!

component_type = ComponentType.find_or_initialize_by(:name => 'HDMI/USB Converter')
component_type.save!

# New Endpoint Attribute 
record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'video_profile')
record.description = 'iObserver Video Profile (Soft reboot is required after change) 1=High/HD720 - Default, 2=Medium/HVGA, 3=Low/QVGA'
record.group_no = 2
record.send_to_device = 1
record.is_boolean = 0
record.save!

# New Device Type Names 
# DeviceTypeName model validates uniqueness of common_name which will make sure these rows do not get duplicated
# If a common name record is put in here twice, only the first one entered will persist
# If a common name is to be removed it should be removed from this list or deactivated
DeviceTypeName.create([
   {:standard_device_type => 'SONY', :common_name => 'APS324W-NF'},
   {:standard_device_type => 'SONY', :common_name => 'APS324W-F'},
   {:standard_device_type => 'SONY', :common_name => 'APS322W-NF'},
   {:standard_device_type => 'SONY', :common_name => 'APS322W-F'},
   {:standard_device_type => 'SONY', :common_name => 'APS223C-NF'},
   {:standard_device_type => 'SONY', :common_name => 'APS223C-F'},
   {:standard_device_type => 'MEDWEL_WALL', :common_name => 'APS201W-NF'},
   {:standard_device_type => 'MEDWEL_WALL', :common_name => 'APS201W-F'},
   {:standard_device_type => 'MEDWEL_WALL', :common_name => 'APS100W-NF'},
   {:standard_device_type => 'MEDWEL_WALL', :common_name => 'APS100W-F'},
   {:standard_device_type => 'MEDWEL_WALL', :common_name => 'Oneview STB'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS240W-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS240W-F'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS340W-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS340W-F'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS370W-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS370W-F'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS370W-BS-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS370W-BS-F'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS301W-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS301W-F'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS202W-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS202W-F'},
   {:standard_device_type => 'MEDWEL_TABLET', :common_name => 'APS250C-NF'},
   {:standard_device_type => 'MEDWEL_TABLET', :common_name => 'APS250C-F'},
   {:standard_device_type => 'MEDWEL_TABLET', :common_name => 'APS150C-NF'},
   {:standard_device_type => 'MEDWEL_TABLET', :common_name => 'APS150C-F'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS222C-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS222C-F'},
   {:standard_device_type => 'MEDWEL_CONDENSED_260C', :common_name => 'APS260C-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED_260C', :common_name => 'APS260C-F'},
   {:standard_device_type => 'MEDWEL_CONDENSED_260W', :common_name => 'APS260W-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED_260W', :common_name => 'APS260W-F'},
   {:standard_device_type => 'MEDWEL_CONDENSED_360C', :common_name => 'APS360C-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED_360C', :common_name => 'APS360C-F'},
   {:standard_device_type => 'MEDWEL_CONDENSED_360W', :common_name => 'APS360W-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED_360W', :common_name => 'APS360W-F'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS270W-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'APS270W-F'},
   {:standard_device_type => 'SONY_VENUS_258C', :common_name => 'APS258C-NF'},
   {:standard_device_type => 'SONY_VENUS_258C', :common_name => 'APS258C-F'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'IB-MED-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'IB-MED-F'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'IB-CLINIC-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'IB-CLINIC-F'},
   {:standard_device_type => 'MEDWEL_CONDENSED_GW', :common_name => 'APS240W-GW-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED_GW', :common_name => 'APS240W-GW-F'},
   {:standard_device_type => 'MEDWEL_CONDENSED_GW', :common_name => 'APS340W-GW-NF'},
   {:standard_device_type => 'MEDWEL_CONDENSED_GW', :common_name => 'APS340W-GW-F'},
   {:standard_device_type => 'MEDWEL_CART', :common_name => 'APS301C-NF'},
   {:standard_device_type => 'MEDWEL_CART', :common_name => 'APS301C-F'},
   {:standard_device_type => 'MEDWEL_CART', :common_name => 'APS302C-NF'},
   {:standard_device_type => 'MEDWEL_CART', :common_name => 'APS302C-F'},
   {:standard_device_type => 'MEDWEL_CART', :common_name => 'APS201C-NF'},
   {:standard_device_type => 'MEDWEL_CART', :common_name => 'APS201C-F'},
   {:standard_device_type => 'MEDWEL_CART', :common_name => 'APS202C-NF'},
   {:standard_device_type => 'MEDWEL_CART', :common_name => 'APS202C-F'},
   {:standard_device_type => 'SONY', :common_name => 'ICU Wall', :list_priority => 0},
   {:standard_device_type => 'MEDWEL_WALL', :common_name => 'Acute Wall' , :list_priority => 0},
   {:standard_device_type => 'MEDWEL_CART', :common_name => 'Acute Cart' , :list_priority => 0},
   {:standard_device_type => 'MEDWEL_CONDENSED_GW', :common_name => 'Acute Condensed GW' , :list_priority => 0},
   {:standard_device_type => 'MEDWEL_CONDENSED', :common_name => 'Acute Condensed' , :list_priority => 0},
   {:standard_device_type => 'CISCO', :common_name => 'Standards Based' , :list_priority => -1},
   {:standard_device_type => 'WINDOWS', :common_name => 'Windows' , :list_priority => -1},
   {:standard_device_type => 'CART', :common_name => 'ICU Cart - Nuc' , :list_priority => -1}
   ])

## twilio phone number default
@numbers = PhoneNumber.all.count
if @numbers < 1 
  PhoneNumber.create(:name => 'United States', :flag_code => 'us', :dial_code=>'+1', :format => '(xxx) xxx-xxxx')
end

# INC-220: 'TigrPx' device integration
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'tigrpx_jwt_key')
record.title_display = 'TigrPx Telenursing Provider Base64 encoded shared secret'
record.group_no = 1
record.is_boolean = 0
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'tigrpx_poll_freq')
record.title_display = 'TigrPx Telenursing Provider polling frequency in ms (default: 10000)'
record.group_no = 1
record.is_boolean = 0
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'tigrpx_base_url')
record.title_display = 'TigrPx Telenursing Provider API base url'
record.group_no = 1
record.is_boolean = 0
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'tigrpx_jwt_expiry')
record.title_display = 'TigrPx Telenursing Provider JWT expiry time (default: 3m)'
record.group_no = 1
record.is_boolean = 0
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'tigrpx_jwt_issuer')
record.title_display = "TigrPx Telenursing Provider JWT issuer (default: 'Telehealth Services')"
record.group_no = 1
record.is_boolean = 0
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'tigrpx_jwt_audience')
record.title_display = "TigrPx Telenursing Provider Audience JWT claim (default: 'caregility.com')"
record.group_no = 1
record.is_boolean = 0
record.send_to_device = 1
record.save!

# New Endpoint Attribute
record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'hide_elert_on_touch_screen')
record.description = 'Hide Alert Button on Touch (true/[false])'
record.group_no = 1
record.send_to_device = 1
record.save!

# New Endpoint Attribute
record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'tigrpx_enabled')
record.description = 'TigrPx Telenursing Provider integration'
record.group_no = 2
record.is_boolean = 1
record.send_to_device = 1
record.save!

record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'tigrpx_nurse_unit')
record.description = "TigrPx Telenursing 'nurseUnit' property"
record.group_no = 2
record.send_to_device = 1
record.is_boolean = 0
record.save!

# New Endpoint Attribute 
record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'tigrpx_room')
record.description = "TigrPx Telenursing 'room' property"
record.group_no = 2
record.send_to_device = 1
record.is_boolean = 0
record.save!

# New Endpoint Attribute 
record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'tigrpx_bed')
record.description = "TigrPx Telenursing 'bed' property"
record.group_no = 2
record.send_to_device = 1
record.is_boolean = 0
record.save!

record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'eis_enabled')
record.description = 'EIS integration'
record.group_no = 2
record.send_to_device = 1
record.is_boolean = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => EIS_API_BASE)
record.title_display = 'EIS API base (must start with http:// or https://)'
record.group_no = 1
record.send_to_device = 1
record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => EIS_API_PATH)
record.title_display = 'EIS API path'
record.group_no = 1
record.send_to_device = 1
record.save!

##  Requested to remove INC-353 for now
#record = ClientAttributeType.find_or_initialize_by(:name_tag => 'multiple_call_poh')
#record.title_display = 'POH on multiple iConsult calls (true / [false])'
#record.group_no = 1
#record.send_to_device = 1
#record.save!

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'interpreter_enabled_in_patient_facing_mobile_app')
record.title_display = 'Interpreter enabled in patient-facing mobile app (TRUE | FALSE [default])'
record.group_no = 1
record.is_boolean = 0
record.send_to_device = 0
record.force_editable = 1
record.save!

# INC-286: New properties for device type names
DeviceTypeName.find_or_initialize_by(:common_name => "APS324W-NF").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS324W-F").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS322W-NF").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS322W-F").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS201W-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS201W-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS240W-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS240W-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS240W-GW-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS240W-GW-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS340W-NF").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS340W-F").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS340W-GW-NF").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS340W-GW-F").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS370W-NF").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS370W-F").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS370W-BS-NF").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS370W-BS-F").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS301W-NF").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "APS301W-F").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "APS202W-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS202W-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS301C-NF").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "APS301C-F").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "APS302C-NF").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "APS302C-F").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "APS201C-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "APS201C-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "APS202C-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS202C-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS250C-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "APS250C-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "APS222C-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "APS222C-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "APS223C-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "APS223C-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "IB-MED-NF").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "IB-MED-F").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "IB-CLINIC-NF").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "IB-CLINIC-F").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS260W-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS260W-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS360W-NF").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS360W-F").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => true, :nightview => true, :can_hard_reboot => true, :has_sony_camera => true, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS260C-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => true, :standard_device_type => "SONY_VENUS_258C")
DeviceTypeName.find_or_initialize_by(:common_name => "APS260C-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => true, :standard_device_type => "SONY_VENUS_258C")
DeviceTypeName.find_or_initialize_by(:common_name => "APS150C-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => false, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "APS150C-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => false, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => true)
DeviceTypeName.find_or_initialize_by(:common_name => "APS360C-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => true, :standard_device_type => "SONY_VENUS_258C")
DeviceTypeName.find_or_initialize_by(:common_name => "APS360C-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => true, :standard_device_type => "SONY_VENUS_258C")
DeviceTypeName.find_or_initialize_by(:common_name => "APS270W-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS270W-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS100W-NF").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => false, :nightview => false, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "APS100W-F").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => false, :nightview => false, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => false)
DeviceTypeName.find_or_initialize_by(:common_name => "Oneview STB").update_attributes(:camera_brightness_adjustment => true, :camera_focus_adjustment => false, :nightview => false, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => false)

# TBC: 
#DeviceTypeName.find_or_initialize_by(:common_name => "APS270W-BS-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
#DeviceTypeName.find_or_initialize_by(:common_name => "APS270W-BS-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => true, :can_hard_reboot => true, :has_sony_camera => false, :has_battery => false)
#DeviceTypeName.find_or_initialize_by(:common_name => "APS270C-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => false, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => true)
#DeviceTypeName.find_or_initialize_by(:common_name => "APS270C-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => false, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => true)
#DeviceTypeName.find_or_initialize_by(:common_name => "APS258C-F").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => false, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => true)
#DeviceTypeName.find_or_initialize_by(:common_name => "APS258C-NF").update_attributes(:camera_brightness_adjustment => false, :camera_focus_adjustment => false, :nightview => false, :can_hard_reboot => false, :has_sony_camera => false, :has_battery => true)

# By default all DeviceTypeNames are active unless explicity set to inactive
DeviceTypeName.update_all(:active_device_type => true)
DeviceTypeName.find_or_initialize_by(:common_name => "ICU Wall").update_attributes(:active_device_type => false)
DeviceTypeName.find_or_initialize_by(:common_name => "Acute Wall").update_attributes(:active_device_type => false)
DeviceTypeName.find_or_initialize_by(:common_name => "Acute Cart").update_attributes(:active_device_type => false)
DeviceTypeName.find_or_initialize_by(:common_name => "Acute Condensed GW").update_attributes(:active_device_type => false)
DeviceTypeName.find_or_initialize_by(:common_name => "Acute Condensed").update_attributes(:active_device_type => false, :can_hard_reboot => true)
DeviceTypeName.find_or_initialize_by(:common_name => "ICU Cart - Nuc").update_attributes(:active_device_type => false)

# Out-Patient Service
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'out_patient_service')
record.title_display = 'Virtual Visits (LEGACY[default]|V2)' 
record.group_no = 1
record.send_to_device = 0
record.force_editable = 1
record.save!

# Clinician to APS call:  Define name to be sent in guest invite (TR-993) INC-296
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'guest_invite_clinician_template')
record.title_display = 'Clinician Template for Guest Invitations (FNAME|LNAME|FULLNAME[default]|LINITIAL)' 
record.group_no = 1
record.send_to_device = 0
record.force_editable = 1
record.save!

# INC-264: Tytocare
record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'tytocare_enabled')
record.update_attribute(:description, 'TytoCare Integration')
record.update_attribute(:group_no, 2)
record.update_attribute(:send_to_device, 1)
record.update_attribute(:is_boolean, 1)

record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'tytocare_ssid')
record.update_attribute(:description, 'TytoCare SSID')
record.update_attribute(:group_no, 2)
record.update_attribute(:send_to_device, 1)

record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'tytocare_password')
record.update_attribute(:description, 'TytoCare WiFi Password')
record.update_attribute(:group_no, 2)
record.update_attribute(:send_to_device, 1)

## Device Type Name changes after they were live
## Keep this at the end of this file
Endpoint.where('device_common_name = ?', "APS270C-NF").update_all(:device_common_name => "APS270W-NF")
Endpoint.where('device_common_name = ?', "APS270C-F").update_all(:device_common_name => "APS270W-F")

## Delete extra records
## Keep this at the end of this file
DeviceTypeName.where("common_name like ?", "APS270C%").delete_all

# INC-358: Configurable to determine whether the Customer allows Clinicians to make other guests host
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'allow_make_host')
record.title_display = 'Clinicians can transfer host rights to other guests? (TRUE | FALSE [default])'
record.group_no = 1
record.is_boolean = 0
record.send_to_device = 0
record.force_editable = 1
record.save!

# INC-359: Add billing code to SIP invite when inviting a Stratus interpreter (TR-1275)
record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'stratus_billing_code')
record.description = 'Stratus Billing Code'
record.group_no = 1
record.send_to_device = 1
record.is_boolean = 0
record.save!

# INC-391: New Endpoint attribute type values
record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'wifi_channel')
record.description = 'Wifi Channel'
record.group_no = 1
record.send_to_device = 1
record.is_boolean = 0
record.endpoint_attribute_type_values << EndpointAttributeTypeValue.find_or_initialize_by(:name => '2.4 GHz')
record.endpoint_attribute_type_values << EndpointAttributeTypeValue.find_or_initialize_by(:name => '5.0 GHz')
record.endpoint_attribute_type_values << EndpointAttributeTypeValue.find_or_initialize_by(:name => 'Automatic')
record.save!

record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'roaming_behaviour')
record.description = 'Roaming Behavior'
record.group_no = 1
record.send_to_device = 1
record.is_boolean = 0
record.endpoint_attribute_type_values << EndpointAttributeTypeValue.find_or_initialize_by(:name => 'More Agressive')
record.endpoint_attribute_type_values << EndpointAttributeTypeValue.find_or_initialize_by(:name => 'Less Aggressive')
record.endpoint_attribute_type_values << EndpointAttributeTypeValue.find_or_initialize_by(:name => 'Default')
record.save!

# INC-436: Commented out of 2021.05 for 2021.06 
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'out_patient_service_waiting_room_url')
record.title_display = 'Virtual Visits Waiting Room URL'
record.group_no = 1
record.send_to_device = 0
record.force_editable = 1
record.save!

# INC 484 - CAL API Request Forwarding V2 Flag and URL
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'api_request_forwarding_service')
record.title_display = 'CAL API Request Forwarding (LEGACY[default]|V2)' 
record.group_no = 1
record.send_to_device = 0
record.force_editable = 1
record.save!

# INC 526 - Hide Function Sidebar on Touch Screen APS's  
#record = ClientAttributeType.find_or_initialize_by(:name_tag => 'show_endpoint_functions')
#record.title_display = 'Show Endpoint Functions On Touch APS? (TRUE | FALSE [default])' 
#record.group_no = 1
#record.send_to_device = 1
#record.force_editable = 1
#record.save!

# INC-521: New Endpoint attribute type for "Display Online Indicator While Inactive"
record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'enable_online_indicator')
record.description = 'Display Online Indicator While Inactive'
record.group_no = 1
record.send_to_device = 1
record.is_boolean = 1
record.save!

# INC-540: Device Attribute: "enable_sound_control" 
record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'enable_sound_control')
record.description = 'Sidebar sound control button'
record.group_no = 1
record.send_to_device = 1
record.is_boolean = 1
record.save!

# ICP-66: Customer Attribute: iObserver Notification Sound 
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'iobserver_notification_sound')
record.title_display = 'iObserver Notification Sound (0=Original[Default], 1=iObserver Sound 2)'
record.group_no = 1
record.send_to_device = 1
record.force_editable = 1
record.is_boolean = 0
record.save!

# INC-575: Device Attribute: "guest_button_enabled" 
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'guest_button_enabled')
record.title_display = 'Guest button enabled (TRUE[default]|FALSE)'
record.group_no = 1
record.send_to_device = 0
record.force_editable = 1
record.is_boolean = 0
record.save!

# ICP-76: eVideon
record = ClientAttributeType.find_or_initialize_by(:name_tag => 'evideon_api_base')
record.update_attribute(:title_display, 'eVideon API base')
record.update_attribute(:group_no, 7)
record.update_attribute(:send_to_device, 1)
record.update_attribute(:force_editable, 1)

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'evideon_site')
record.update_attribute(:title_display, 'eVideon Site')
record.update_attribute(:group_no, 7)
record.update_attribute(:send_to_device, 1)
record.update_attribute(:force_editable, 1)

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'evideon_api_key')
record.update_attribute(:title_display, 'eVideon API key')
record.update_attribute(:group_no, 7)
record.update_attribute(:send_to_device, 1)
record.update_attribute(:force_editable, 1)

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'evideon_msg_timeout')
record.update_attribute(:title_display, 'eVideon hide message after timeout')
record.update_attribute(:group_no, 7)
record.update_attribute(:send_to_device, 1)
record.update_attribute(:force_editable, 1)

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'evideon_retry_num')
record.update_attribute(:title_display, 'eVideon retry attempts for \'start\' commands')
record.update_attribute(:group_no, 7)
record.update_attribute(:send_to_device, 1)
record.update_attribute(:force_editable, 1)

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'evideon_retry_interval')
record.update_attribute(:title_display, 'eVideon retry interval')
record.update_attribute(:group_no, 7)
record.update_attribute(:send_to_device, 1)
record.update_attribute(:force_editable, 1)

record = ClientAttributeType.find_or_initialize_by(:name_tag => 'evideon_api_enabled')
record.update_attribute(:title_display, 'eVideon enabled? (TRUE|FALSE[default])')
record.update_attribute(:group_no, 7)
record.update_attribute(:send_to_device, 1)
record.update_attribute(:force_editable, 1)

record = EndpointAttributeType.find_or_initialize_by(:name_tag => 'evideon_serial')
record.update_attribute(:description, 'eVideon device serial')
record.update_attribute(:group_no, 1)
record.update_attribute(:send_to_device, 1)