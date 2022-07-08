ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'capybara/rails'
require 'capybara/minitest'

$LOAD_PATH.unshift File.expand_path('../lib', __FILE__)
require 'minitest/autorun'
require "minitest/reporters"
Minitest::Reporters.use! Minitest::Reporters::JUnitReporter.new

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...

  # Make the Capybara DSL available in all integration tests
  include Capybara::DSL
  # Make `assert_*` methods behave like Minitest assertions
  include Capybara::Minitest::Assertions

  include Devise::Test::IntegrationHelpers

  # Reset sessions and driver between tests
  # Use super wherever this method is redefined in your individual test classes
  def teardown
    Capybara.reset_sessions!
    Capybara.use_default_driver
  end

  # A user with only the Clinician (UHE) role should automatically see 
  # the Clinician application
  def login_as_clinician
    login_as("clinician@caregility.com", "Test123")
    assert_selector "h1", text: "Dial Patient"
  end

  # Super Admin should be presented with the Application selector (Admin|Clinician|Tech)
  def login_as_super_admin
    login_as("super_admin@caregility.com", "Test123")
    assert_selector "h1", text: "Select Your System"
    select('Admin System', :from => 'next_step')
    click_on "Select"
    assert_text ("Monitoring System")
  end
  
  # Log in as one of the test users
  def login_as(username, password)
    visit root_path
    find '#inputEmail'
    within(:xpath, "//*[@id='new_admin']") do
      fill_in 'inputEmail', with: username
      fill_in 'inputPassword', with: password
    end
    click_button 'Sign in'
  end
end
