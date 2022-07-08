require 'test_helper'

class ClientTest < ActiveSupport::TestCase

  setup do
    # Nothing
  end
 
  teardown do
    # Nothing
  end

  test "Client with valid 'mychart_participant_invite_expiry_time' value" do 
    client = Client.find(8)
    assert_equal(client.meeting_invite_expiry_time, 50)
  end

  test "Client with invalid 'mychart_participant_invite_expiry_time' value" do 
    client = Client.find(8)
    client_attribute = ClientAttribute.where(:client_id => 8).first

    client_attribute.value = "-10"
    client_attribute.save
    assert_equal(client.meeting_invite_expiry_time, 30)

    client_attribute.value = "animal"
    client_attribute.save
    assert_equal(client.meeting_invite_expiry_time, 30)

    client_attribute.value = "0"
    client_attribute.save
    assert_equal(client.meeting_invite_expiry_time, 30)

    client_attribute.value = "fdd7qk33"
    client_attribute.save
    assert_equal(client.meeting_invite_expiry_time, 30)
  end

  test "Client with no 'mychart_participant_invite_expiry_time' value" do 
    client = Client.find(8)
    client_attribute = ClientAttribute.where(:client_id => 8).first.destroy
    assert_equal(client.meeting_invite_expiry_time, 30)
  end

end
