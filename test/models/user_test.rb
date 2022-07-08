require 'test_helper'

class UserTest < ActiveSupport::TestCase

  test "client with FNAME" do
    user = User.find(8)
    customer = Client.find(1)
    assert_equal("Dr Zeus", User.determine_clinician_invite_template(user, customer))
  end

  test "client with LNAME" do
    user = User.find(8)
    customer = Client.find(2)
    assert_equal("Dr Springsteen", User.determine_clinician_invite_template(user, customer))
  end

  test "client with FULLNAME" do
    user = User.find(8)
    customer = Client.find(3)
    assert_equal("Dr Zeus Springsteen", User.determine_clinician_invite_template(user, customer))
  end

  test "client with LINITIAL" do
    user = User.find(8)
    customer = Client.find(4)
    assert_equal("Dr Zeus S", User.determine_clinician_invite_template(user, customer))
  end

  test "test UserCheckPasswordComplexityService" do
    assert UserCheckPasswordComplexityService.new("Hipp0_]", 3).valid?
  end

end
