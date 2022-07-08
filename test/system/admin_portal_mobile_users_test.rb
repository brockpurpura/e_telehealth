require "application_system_test_case"

class AdminPortalMobileUsersTest < ApplicationSystemTestCase
  
  setup do
    # Nothing
  end
 
  teardown do
    puts "logging out"
    visit admins_sign_out_path
  end


  test "Log in as Super Admin and add Mobile User" do 
    login_as_super_admin
    find("a", :text => "Mobile Patients")
    find("div", :text => "Mobile Patients", :class => "sidebar_plaintext")
    click_link('Mobile Patients')
    assert_selector("h3", text: "Mobile Patients")
    find("a", :text => "Add Mobile Patient")
    assert_text("Add Mobile Patient")
    assert_text("Download")
    assert_text("Saved Reports")
    click_on('Add Mobile Patient')
    assert_selector("h2", text: "Add Mobile Patient")
    assert_selector('input[name="create_mobile_patient[email]"]', text: '', visible: true)
    assert_selector('input[name="create_mobile_patient[password]"]', text: '', visible: true)
    select('Patient', :from => 'mobileRoleDropdown')
    select('InPatient', :from => 'mobileSpecialtyDropdown')
    fill_in('create_mobile_patient[email]', :with => 'mobile_patient_2@caregility.com')
    fill_in('create_mobile_patient[password]', :with => 'test123')
    click_on('Add')
    assert_text("Must contain 3 out of 4 : Uppercase letter, lowercase letter, number and/or special character")
    fill_in('create_mobile_patient[password]', with: "Test123")
    click_on('Add')
    assert_text("mobile_patient_2@caregility.com")
  end

end
