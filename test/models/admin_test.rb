require 'test_helper'

class AdminTest < ActiveSupport::TestCase
  
  test "valid roles and specialties" do
    assert Admin.valid_clinician_role?("Provider")
    assert Admin.valid_clinician_role?("provider")
    assert Admin.valid_clinician_role?(" provider ")
    assert Admin.valid_clinician_role?("proVIDER")
    assert_not Admin.valid_clinician_role?("Provider!")
    assert_not Admin.valid_clinician_role?("Clown")
    assert Admin.valid_clinician_specialty?("Provider", "CNS")
    assert Admin.valid_clinician_specialty?("Provider", "cns")
    assert Admin.valid_clinician_specialty?("Provider", "CNS  ")
    assert_not Admin.valid_clinician_role?("")
    assert_not Admin.valid_clinician_role?(nil)
    assert Admin.valid_clinician_specialty?("PROVider", "CNS")
    assert Admin.valid_patient_role?("Patient")
    assert Admin.valid_patient_role?("patient")
    assert Admin.valid_patient_role?(" patient ")
    assert Admin.valid_patient_role?("patIENT")
    assert Admin.valid_patient_specialty?("Patient", "InPatient")
    assert Admin.valid_patient_specialty?("Patient", "inpatient")
    assert Admin.valid_patient_specialty?("Patient", "Inpatient  ")
    assert Admin.valid_patient_specialty?("Patient", "Inpatient")
  end


  def test_is_email_valid
    assert Admin.is_email_valid? "elfie@santa.com"
    assert Admin.is_email_valid? "123@santa.com"
    assert Admin.is_email_valid? "f_UNNy-cAsEs@santa.com"
    assert Admin.is_email_valid? "elfie@911.com"
    assert Admin.is_email_valid? "elfie@911.com "
    assert Admin.is_email_valid? " elfie@911.com"
    assert Admin.is_email_valid? "elfie@911.online"
    assert_not Admin.is_email_valid? "elfiesanta.com"
    assert_not Admin.is_email_valid? "elfie@santa.whatever"
    assert_not Admin.is_email_valid? "elfie@911.911"
    assert_not Admin.is_email_valid? "HMW5ERoaming1s@unit_testing.org"
    assert Admin.is_email_valid? "HMW5ERoaming1s@baptist-health.com"
  end

end
