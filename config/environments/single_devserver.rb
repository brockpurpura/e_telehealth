require 'syslog/logger'

Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  config.action_cable.url = 'wss://univagohealthcare.com:8443'
  config.action_cable.allowed_request_origins = ["https://univagohealthcare.univago.com"]

  # Code is not reloaded between requests.
  #config.cache_classes = true

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Eager load code on boot. This eager loads most of Rails and
  # your application in memory, allowing both threaded web servers
  # and those relying on copy on write to perform better.
  # Rake tasks automatically ignore this option for performance.
  #config.eager_load = true

  # Do not eager load code on boot.
  config.eager_load = false

  # Full error reports are disabled and caching is turned on.
  config.consider_all_requests_local       = false
  #config.action_controller.perform_caching = true

  # Show full error reports and disable caching.
  #config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Enable Rack::Cache to put a simple HTTP cache in front of your application
  # Add `rack-cache` to your Gemfile before enabling this.
  # For large-scale production use, consider using a caching reverse proxy like
  # NGINX, varnish or squid.
  # config.action_dispatch.rack_cache = true

  # Disable serving static files from the `/public` folder by default since
  # Apache or NGINX already handles this.
  config.serve_static_files = ENV['RAILS_SERVE_STATIC_FILES'].present?

  # Compress JavaScripts and CSS.
  config.assets.js_compressor = Uglifier.new(harmony:true) 
  # config.assets.css_compressor = :sass

  # Do not fallback to assets pipeline if a precompiled asset is missed.
  #config.assets.compile = false

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  #config.assets.debug = true

  # Asset digests allow you to set far-future HTTP expiration dates on all assets,
  # yet still be able to expire them through the digest params.
  config.assets.digest = true

  # `config.assets.precompile` and `config.assets.version` have moved to config/initializers/assets.rb

  # Specifies the header that your server uses for sending files.
  # config.action_dispatch.x_sendfile_header = 'X-Sendfile' # for Apache
  # config.action_dispatch.x_sendfile_header = 'X-Accel-Redirect' # for NGINX

  # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
  config.force_ssl = true

  # Adds additional error checking when serving assets at runtime.
  # Checks for improperly declared sprockets dependencies.
  # Raises helpful error messages.
  #config.assets.raise_runtime_errors = true

  # Use the lowest log level to ensure availability of diagnostic information
  # when problems arise.
  config.log_level = :warn

  # Prepend all log lines with the following tags.
  # config.log_tags = [ :subdomain, :uuid ]

  # Use a different logger for distributed setups.
  # config.logger = ActiveSupport::TaggedLogging.new(SyslogLogger.new)
  config.logger = Syslog::Logger.new('univago', Syslog::LOG_LOCAL0)

  # Use a different cache store in production.
  # config.cache_store = :mem_cache_store

  # Don't care if the mailer can't send.
  # config.action_mailer.raise_delivery_errors = false

  # Enable serving of images, stylesheets, and JavaScripts from an asset server.
  # config.action_controller.asset_host = 'http://assets.example.com'
  config.action_mailer.default_url_options = { :host => "univagohealthcare.com" }
  

  # Ignore bad email addresses and do not raise email delivery errors.
  # Set this to true and configure the email server for immediate delivery to raise delivery errors.
 # config.action_mailer.raise_delivery_errors = false

  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation cannot be found).
  config.i18n.fallbacks = true

  # Send deprecation notices to registered listeners.
  #config.active_support.deprecation = :notify

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Use default logging formatter so that PID and timestamp are not suppressed.
  config.log_formatter = ::Logger::Formatter.new

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Do not dump schema after migrations.
  config.active_record.dump_schema_after_migration = false

  Twilio.configure do |config|
    config.account_sid = 'AC0e4178eb400bce17122edc9b49982033'
    config.auth_token = '2011803183a8ca7a476125ac244de5f9'
  end

  config.twilio_client = Twilio::REST::Client.new


end
