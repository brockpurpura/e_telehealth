require 'test_helper'

class CreateUserJobTest < ActionDispatch::IntegrationTest

    @@cuj = CreateUserJob.new

    def test_import_clinician
        @@cuj.perform(1)
    
        clinician1 = Admin.where(:email => "adambraunton+inc193-j@gmail.com").first
        assert_not_nil(clinician1)
        assert_equal "Adam", clinician1.first_name
        assert_equal "Braunton", clinician1.last_name
        assert_equal "System Testing Channel", clinician1.client_admin.name
        assert_equal "System Testing Customer", clinician1.client.client_name
        assert_equal "Provider", clinician1.mobile_role
        assert_equal "CNS", clinician1.mobile_specialty
        assert_equal "adambraunton+inc193-j@gmail.com", clinician1.email
        assert_equal "2134432334", clinician1.phone_number
        assert clinician1.is_uhe?
        assert clinician1.is_allowed_clinician_client(Client.find(1))
    end

    def test_import_clinician_alternative_spelling_of_specialty
        @@cuj.perform(2)
    
        clinician1 = Admin.where(:email => "adambraunton+inc193-k@gmail.com").first
        assert_not_nil(clinician1)
        assert_equal "Adam", clinician1.first_name
        assert_equal "Braunton", clinician1.last_name
        assert_equal "System Testing Channel", clinician1.client_admin.name
        assert_equal "System Testing Customer", clinician1.client.client_name
        assert_equal "Provider", clinician1.mobile_role
        assert_equal "CNS", clinician1.mobile_specialty
        assert_equal "adambraunton+inc193-k@gmail.com", clinician1.email
        assert_equal "2134432334", clinician1.phone_number
        assert clinician1.is_uhe?
        assert clinician1.is_allowed_clinician_client(Client.find(1))
    end

    def test_import_clinician_misspelled_header
        row = BatchRow.find(3)
        @@cuj.perform(3)
        puts "Report: " + BatchRow.find(3).report.to_s
        clinician2 = Admin.where(:email => "test_import_clinician_misspelled_header@gmail.com").first
        assert_nil(clinician2)
    end

    def test_import_patient
        row = BatchRow.find(4)
        @@cuj.perform(row.id)
        puts "Report: " + BatchRow.find(4).report.to_s
        assert_nil row.report
        patient = Admin.where(:email => "careconnect15a11@KAISERSACRAMENTOOO.com").first
        assert_not_nil(patient)
        assert_equal "CareConnect 15", patient.first_name

        assert_equal "System Testing Channel", patient.client_admin.name
        assert_equal "System Testing Customer", patient.client.client_name
        assert_equal "Staging Location", patient.mobile_location.name
        assert_equal "Eatontown", patient.mobile_unit.name

        assert_equal "Patient", patient.mobile_role
        assert_equal "InPatient", patient.mobile_specialty
        assert_equal "careconnect15a11@KAISERSACRAMENTOOO.com".downcase, patient.email.downcase
    end

end