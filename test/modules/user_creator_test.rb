require 'test_helper'

class UserCreatorTest < ActionDispatch::IntegrationTest

    @@user_attributes = {
        "email" => "test_user@gmail.com",
        "specialty" => "InPatient",
        "first_name" => "Malcom",
        "channel" => "System Testing Channel",
        "customer" => "Customer A",
        "location" => "Common Location Name",
        "unit" => "Common Room Name",
        "third_party_auth" => "",
        "password" => "FEbc234g"
    }

    def test_is_true
        assert(UserCreator.is_true("TRUE"))
        assert(UserCreator.is_true("true"))
        assert(UserCreator.is_true("    true"))
        assert(UserCreator.is_true("true     "))
        assert UserCreator.is_true("FALSE") == false
        assert UserCreator.is_true("   FALSE") == false
        assert UserCreator.is_true("FALSE   ") == false
        assert UserCreator.is_true("false") == false
        assert_raise(RuntimeError) do
            UserCreator.is_true("yes")
        end
        assert_raise(RuntimeError) do
            UserCreator.is_true("YES")
        end
        assert_raise(RuntimeError) do
            UserCreator.is_true("1")
        end
        assert_raise(RuntimeError) do
            UserCreator.is_true(1)
        end
        assert_raise(RuntimeError) do
            UserCreator.is_true("    ")
        end
    end

    def test_assigning_location
        batch_row = BatchRow.find(5)
        UserCreator.create_user(batch_row, @@user_attributes)
        patient = Admin.where(:email => "test_user@gmail.com").first
        loc = Building.find(patient.mobile_location_id)
        unit = Room.find(patient.mobile_unit_id)
        assert_equal 11, loc.client.id
    end

    def test_assigning_unit
        batch_row = BatchRow.find(5)
        UserCreator.create_user(batch_row, @@user_attributes)
        patient = Admin.where(:email => "test_user@gmail.com").first
        loc = Building.find(patient.mobile_location_id)
        unit = Room.find(patient.mobile_unit_id)
        assert_equal 11, unit.client.id
    end
  
end













