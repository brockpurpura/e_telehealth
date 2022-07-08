require "application_system_test_case"

class ClinicianCallTest < ApplicationSystemTestCase

  VMR_SUFFIX = "_SYSTEST"
  VMR_DOMAIN = "@SYSTEST.COM"
  PEXIP_BASE_URL = "https://208.184.36.82"
  PEXIP_USERNAME = "admin"
  PEXIP_PASSWORD = "Niagara56"

  setup do
    puts "Generate VMR"
    create_test_vmr
  end
 
  teardown do
    puts "Delete VMR"
    destroy_test_vmr
    puts "Log out"
    visit admins_sign_out_path
  end

  # A Clinician should be sent straight to the Clinician application
  test "Login as a Clinician" do
    login_as_clinician
  end

  def create_test_vmr
    @vmr_name = 5.times.map{rand(10)}.join + VMR_SUFFIX
    @vmr_alias = @vmr_name + VMR_DOMAIN

    response = HTTParty.post(
      "#{PEXIP_BASE_URL}/api/admin/configuration/v1/conference/",
      :verify => false,
      :headers => { "Content-Type" => "application/json"},
      :basic_auth => { username: PEXIP_USERNAME, password: PEXIP_PASSWORD },
      :body => JSON.dump({
        :name => @vmr_name,
        :service_type => 'conference',
        :aliases => [{:alias => @vmr_alias}]
      })
    )
    @vmr_location = response.headers['location']
    puts "Generated test VMR at: #{@vmr_location}"
  end

  def destroy_test_vmr
    puts "Deleting test VMR at: #{@vmr_location}"
    response = HTTParty.delete(
      PEXIP_BASE_URL + @vmr_location.to_s,
      :verify => false,
      :headers => { "Content-Type" => "application/json"},
      :basic_auth => { username: PEXIP_USERNAME, password: PEXIP_PASSWORD }
    )
  end



end




