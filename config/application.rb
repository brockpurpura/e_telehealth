require_relative 'boot'

require 'rails/all'
require "action_view/railtie"
require "sprockets/railtie"
require 'sprockets/es6'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Telehealth
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    config.autoload_paths << Rails.root.join('lib')
    config.autoload_paths << Rails.root.join('lib/jobs')

    # Do not swallow errors in after_commit/after_rollback callbacks.
    # PUT BACK?
    ##config.active_job.queue_adapter = :delayed_job

     # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.action_cable.disable_request_forgery_protection = true

    require Rails.root.join("lib/custom_public_exceptions")
    config.exceptions_app = self.routes

    config.active_support.escape_html_entities_in_json = false

    config.redis_url = "redis://#{ENV['REDIS_HOSTNAME'] || 'localhost'}:6379/0"
    config.redis_pool = ConnectionPool.new(size: 3) { Redis.new(url: Rails.configuration.redis_url) }
  end
end
