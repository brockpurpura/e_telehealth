# Be sure to restart your server when you modify this file.

## API static variables

GETWELL_API_FLAG        = 'getwell_api_active'
UNIQUE_API_NAME         = 'unique_api_name'
EIS_API_USERNAME        = 'eis_api_username'
EIS_API_PASSWORD        = 'eis_api_password'
EIS_API_BASE            = 'eis_api_base'
EIS_API_PATH            = 'eis_api_path'

DEFAULT_AUTO_REBOOT_MIN = 2
DEFAULT_CAMERA_EMAIL_MIN = 2

CAMERA_VIDEO_LOST = 'Lost connection to Camera.'
CAMERA_VISCA_LOST = 'Lost connection to Camera controls.' 

WITHHOLD_NOTIFICATIONS = 'withhold_notifications'
EPIC_ALERT_API_URL = 'epic_alert_url'
TIGRPX_NURSE_UNIT = 'tigrpx_nurse_unit'
TIGRPX_ROOM       = 'tigrpx_room'
TIGRPX_BED        = 'tigrpx_bed'

TYTOCARE_PREFIX = "caregility"

SECONDS_TO_REINVITE = 'patient_reinvite_time_in_sec'
DEFAULT_SECONDS_TO_REINVITE = 8

CUSTOM_MOBILE_BANDWIDTH = 'mobile_bandwidth'
POH_MUTE_INCOMING = 'poh_block_incoming'
LOCK_VMRS = 'lock_vmrs'
PLAY_DOORBELL = 'play_doorbell'

# openssl genrsa -out api_private.pem 2048
# openssl rsa -in api_private.pem -outform PEM -pubout -out api_public.pub
begin
    PRIVATE_API_ENCRYPTION_KEY = File.read("../api_private.pem")
    PUBLIC_API_ENCRYPTION_KEY  = File.read("../api_public.pub")
rescue => error
    puts "+++++++++++++++ ERROR: Mobile API & JWT keys missing, auto-generating placeholders"
    exec "openssl genrsa -out ../api_private.pem 2048 && openssl rsa -in ../api_private.pem -outform PEM -pubout -out ../api_public.pub && chmod 600 ../api_public.pub && chmod 600 ../api_private.pem"
end

# JWT claims help us ensure that tokens are only used in the channels they are intended
MOBILE_API_JWT_CLAIM_SECURE_REDIRECT = "secure_redirect"
MOBILE_API_JWT_CLAIM_API             = "mobile_api"
MOBILE_API_JWT_CLAIM_SYSTEM          = "system_token"
MOBILE_API_JWT_CLAIM_MDM             = "mdm_token"

## Sidekiq job names
VMR_MEETING_WORKER_BY_CHANNEL = 'vmr_meeting_worker_by_channel'

# Unique Cloudbreak ID for this Client
#CLOUDBREAK_MARTTI_ID = 'cloudbreak_id'
