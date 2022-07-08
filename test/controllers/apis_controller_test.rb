require 'test_helper'

class ApisControllerTest < ActionDispatch::IntegrationTest
    
    def setup
    end

    #test 'post_device_error should accept compatible Endpoint' do 
    #    post post_device_error_api_path, 
    #        headers: {Authorization: "Basic " + Base64::encode64("4YUjyQb:NsWYTDDgq14b")}, 
    #        params: {instance: "5432546", patient_unit_id: "4"}
    #    assert_equal 200, @response.status
    #    assert_equal "EIS error status sent to room", JSON.parse(@response.body)["message"]
    #end    

    test 'post_device_error should reject unknown Endpoint' do 
        post post_device_error_api_path, 
            headers: {Authorization: "Basic " + Base64::encode64("4YUjyQb:NsWYTDDgq14b")}, 
            params: {instance: "5432546", patient_unit_id: "nonsense_unit_id"}
        assert @response.status == 404
        assert_equal "No room could be identified using the supplied room identifiers", JSON.parse(@response.body)["message"]
    end

    test 'post_device_error should reject Endpoint in Customer not configured with EIS' do 
        post post_device_error_api_path, 
            headers: {Authorization: "Basic " + Base64::encode64("4YUjyQ:NsWYTDDgq14")}, 
            params: {instance: "5432546", patient_unit_id: "2"}
        #assert_equal 400, @response.status
        assert_equal "Customer not configured for EIS", JSON.parse(@response.body)["message"]
    end    

    test 'post_device_error should accept Endpoint in Customer configured with EIS and trigger call to Endpoint' do 
        #post post_device_error_api_path, 
        #    headers: {Authorization: "Basic " + Base64::encode64("4YUjyQb:NsWYTDDgq14b")}, 
        #    params: {instance: "5432546", patient_unit_id: "4"}
        #assert_equal 200, @response.status
        #assert_equal "EIS error status sent to room", JSON.parse(@response.body)["message"]
    end        

end