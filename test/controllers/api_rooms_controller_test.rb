require 'test_helper'

class ApiRoomsControllerTest < ActionDispatch::IntegrationTest
    
    def setup
        post login_system_path, headers: {Authorization: "dWhlX2NsaWVudA=="}, params: { username: Configurable.mobile_api_system_username, password: Configurable.mobile_api_system_password}, xhr: true
        @system_token = JSON.parse(@response.body)["auth_token"]
    end

    def get_user_token(user_id, password)
        post login_user_path, headers: {Authorization: @system_token}, params: {username: user_id, password: password}
        @user_token = JSON.parse(@response.body)["auth_token"]
    end

    test 'request vmrs from pool' do 
        @user_token = get_user_token("clinician@caregility.com", "Tuv123") 
        post allocate_vmr_meeting_path, headers: {Authorization: @user_token}, xhr: true
        assert_response :success
        alias_1 = JSON.parse(@response.body)["vmr_alias"]
        assert_not_nil(alias_1)
        vmr = VmrMeeting.where(:alias => alias_1).first
        assert vmr.on_deck == 0

        post allocate_vmr_meeting_path, headers: {Authorization: @user_token}, xhr: true
        assert_response :success
        alias_2 = JSON.parse(@response.body)["vmr_alias"]
        assert_not_nil(alias_2)
        # Always get a fresh VMR on mobile API requests
        assert alias_1 != alias_2
        vmr = VmrMeeting.where(:alias => alias_2).first
        puts "-- Alias 1 #{alias_1}"
        puts "-- Alias 2 #{alias_2}" 
        assert vmr.on_deck == 0
        assert alias_1.to_s.casecmp(alias_2.to_s) != 0
    end

    test 'request translator details of default customer' do 
        @user_token = get_user_token("clinician@caregility.com", "Tuv123") 
        get get_translator_path, headers: {Authorization: @user_token}, xhr: true
        assert_response :success
        @expected_hash = {
            "customer_name" => "Second Testing Customer",
            "name" => "Stratus",
            "translation_type" => "SIP",
            "marttiid" => "",
            "languages" => [
                {"name" => "German", "male" => "", "female" => "", "any" => "", "uri" => "7002020001@sip-test.nimbusvideo.com"},
                {"name" => "Karen", "male" => "", "female" => "", "any" => "", "uri" => "7002020002@sip-test.nimbusvideo.com"},
                {"name" => "Australian", "male" => "", "female" => "", "any" => "", "uri" => "7002020003@sip-test.nimbusvideo.com"},
                {"name" => "Klingon", "male" => "", "female" => "", "any" => "", "uri" => "7002020004@sip-test.nimbusvideo.com"}
            ]
        }
        assert_equal @expected_hash, JSON.parse(@response.body)
    end
    
    test 'request translator details of specific authorized customer' do 
        @user_token = get_user_token("clinician@caregility.com", "Tuv123") 
        get get_translator_path, headers: {Authorization: @user_token}, params: {customer: "Second Testing Customer"}, xhr: true
        assert_response :success 
        @expected_hash = {
            "customer_name"=>"Second Testing Customer", 
            "name"=>"Stratus", 
            "translation_type"=>"SIP", 
            "marttiid"=>"", 
            "languages"=>[
                {"name"=>"German", "male"=>"", "female"=>"", "any"=>"", "uri"=>"7002020001@sip-test.nimbusvideo.com"}, 
                {"name"=>"Karen", "male"=>"", "female"=>"", "any"=>"", "uri"=>"7002020002@sip-test.nimbusvideo.com"}, 
                {"name"=>"Australian", "male"=>"", "female"=>"", "any"=>"", "uri"=>"7002020003@sip-test.nimbusvideo.com"}, 
                {"name"=>"Klingon", "male"=>"", "female"=>"", "any"=>"", "uri"=>"7002020004@sip-test.nimbusvideo.com"}
            ]
        }
        assert_equal @expected_hash, JSON.parse(@response.body)
    end

    test 'request translator details of unauthorized customer' do 
        @user_token = get_user_token("clinician@caregility.com", "Tuv123") 
        get get_translator_path, headers: {Authorization: @user_token}, params: {customer: "Fifth Testing Customer"}, xhr: true
        assert_response 500
    end

    test 'request translator details of invalid customer' do 
        @user_token = get_user_token("clinician@caregility.com", "Tuv123") 
        get get_translator_path, headers: {Authorization: @user_token}, params: {customer: "dfhydnh"}, xhr: true
        assert_response :error
        assert_equal "Server Error: Invalid or missing Customer [dfhydnh]", JSON.parse(@response.body)["error"]
    end

    # MOB-775: Customers with duplicate names cause error
    test 'request translator details of Customer with duplicate' do 
        @user_token = get_user_token("clinician_19@caregility.com", "Tuv123") 
        get get_translator_path, headers: {Authorization: @user_token}, params: {customer: "Customer B"}, xhr: true
        assert_response :success
    end
    test 'request translator details of Customer with duplicate, no client_id' do 
        @user_token = get_user_token("clinician_25@caregility.com", "Tuv123") 
        get get_translator_path, headers: {Authorization: @user_token}, params: {customer: "Customer B"}, xhr: true
        assert_response :success
    end

    test 'request translator details of a non-channel-admin all-customers clinician' do 
        @user_token = get_user_token("clinician_10@caregility.com", "Test123") 
        get get_translator_path, headers: {Authorization: @user_token}, params: {customer: "System Testing Customer"}, xhr: true
        assert_response :success
    end

    test 'Super User request translator' do 
        @user_token = get_user_token("super_admin@caregility.com", "Test123") 
        get get_translator_path, headers: {Authorization: @user_token}, params: {customer: "System Testing Customer"}, xhr: true
        assert_response :success
    end

    test 'Channel Admin request translator' do 
        @user_token = get_user_token("channel-admin-clinician@caregility.com", "Test123") 
        get get_translator_path, headers: {Authorization: @user_token}, params: {customer: "System Testing Customer"}, xhr: true
        assert_response :success
    end

    test 'Customer Admin request translator' do 
        @user_token = get_user_token("customer-admin-2-clinician@caregility.com", "Test123") 
        get get_translator_path, headers: {Authorization: @user_token}, params: {customer: "System Testing Customer"}, xhr: true
        assert_response :success
    end

    test 'formatted_clinician_display' do 
        @user_token = get_user_token("clinician_18@caregility.com", "Tuv123")
        post formatted_clinician_display_path, headers: {Authorization: @user_token}, params: {vmr_alias: "2"}, xhr: true
        assert_response :success
        assert_equal "true", JSON.parse(response.body)["success"]
        assert_equal "a clinician", JSON.parse(response.body)["formatted_name"]
    end

end