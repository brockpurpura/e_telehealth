require 'test_helper'

class ApiAuthenticationControllerTest < ActionDispatch::IntegrationTest
    
    def setup
        @user = Admin.find(1)
    end

    test '29 days ago' do 
        token = JsonWebToken.encode({:admin_id => @user.id, :email => @user.email, :aud => MOBILE_API_JWT_CLAIM_API, :auth_type => "local", :user_type => @user.is_patient_or_clinician}, 29.days.ago)
        post refresh_token_path, headers: {Authorization: "Bearer " + token}, params: {}, xhr: true
        assert_response :success
        new_token = JSON.parse(@response.body)["auth_token"]
        assert_not_nil new_token
    end    


    test '30 days ago' do 
        token = JsonWebToken.encode({:admin_id => @user.id, :email => @user.email, :aud => MOBILE_API_JWT_CLAIM_API, :auth_type => "local", :user_type => @user.is_patient_or_clinician}, 30.days.ago)
        post refresh_token_path, headers: {Authorization: "Bearer " + token}, params: {}, xhr: true
        assert_response 401
        new_token = JSON.parse(@response.body)["auth_token"]
        assert_nil new_token
        assert_equal "Could not find user or token expired", JSON.parse(@response.body)["error"]
    end  


    test '31 days ago' do 
        token = JsonWebToken.encode({:admin_id => @user.id, :email => @user.email, :aud => MOBILE_API_JWT_CLAIM_API, :auth_type => "local", :user_type => @user.is_patient_or_clinician}, 31.days.ago)
        post refresh_token_path, headers: {Authorization: "Bearer " + token}, params: {}, xhr: true
        assert_response 401
        new_token = JSON.parse(@response.body)["auth_token"]
        assert_nil new_token
        assert_equal "Could not find user or token expired", JSON.parse(@response.body)["error"]
    end  

    test '10 minutes ago' do 
        token = JsonWebToken.encode({:admin_id => @user.id, :email => @user.email, :aud => MOBILE_API_JWT_CLAIM_API, :auth_type => "local", :user_type => @user.is_patient_or_clinician}, 10.minutes.ago)
        post refresh_token_path, headers: {Authorization: "Bearer " + token}, params: {}, xhr: true
        assert_response :success
        new_token = JSON.parse(@response.body)["auth_token"]
        assert_not_nil new_token
    end  
end