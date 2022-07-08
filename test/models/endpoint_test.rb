require 'test_helper'

class EndpointTest < ActiveSupport::TestCase

  setup do
    # Nothing
  end
 
  teardown do
    # Nothing
  end

  test "Get Endpoint VMR" do 
    endpoint = Endpoint.find(1)
    vmr_obj = endpoint.endpoint_current_vmr_obj
    assert_equal(vmr_obj.name, "hc_42468429_uhe_stag_ha")
    assert_equal(15782, vmr_obj.id)
  end

  test "Get Endpoint VMR alias" do 
    endpoint = Endpoint.find(1)
    vmr_alias = endpoint.std_endpoint_current_vmr
    assert_equal("hc_42468429_uhe_stag_ha@univago.com", vmr_alias)
  end

  test "Get Remote Control Admin MDM" do 
    endpoint = Endpoint.find(1)
    mdm_token = endpoint.remote_control_admin_mdm
    puts "Token is " + mdm_token.to_s
    assert_not_nil(mdm_token)

    endpoint = Endpoint.find(2)
    mdm_token = endpoint.remote_control_admin_mdm
    puts "Token is " + (mdm_token.present? ? mdm_token.to_s : 'nil')
    assert_nil(mdm_token)
  end
end
