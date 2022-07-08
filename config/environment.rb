# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

@auth = (Configurable.mailer_password.nil? or Configurable.mailer_password.gsub(' ','').length ==0) ? false : true 
ActionMailer::Base.delivery_method = :smtp

if @auth
  ActionMailer::Base.smtp_settings = {
    :user_name => Configurable.mailer_username, 
    :password => Configurable.mailer_password, 
    :domain => Configurable.mailer_domain,
    :address => Configurable.mailer_address,
    :port => Configurable.mailer_port,
    :authentication => :plain, 
    :enable_starttls_auto => true 
  }
else 
  ActionMailer::Base.smtp_settings = {
    :user_name => @username, 
    :password => @password, 
    :domain => Configurable.mailer_domain,
    :address => Configurable.mailer_address,
    :port => Configurable.mailer_port,
    :authentication => nil, 
    :enable_starttls_auto => true 
  }
end
