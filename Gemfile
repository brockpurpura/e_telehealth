source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '= 5.2.6'

gem 'envyable', '1.2.0', require: 'envyable/rails-now'

# Use mysql as the database for Active Record
gem 'mysql2', '0.4.10'
# Use SCSS for stylesheets
gem 'sass-rails', '5.0.7'
# Use Puma as the app server
#gem 'puma', '~> 3.7'
gem 'redis', '3.3.5'
gem 'redis-namespace', '1.6.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '3.2.0' 
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '4.2.2'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails', '4.3.3'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '2.8.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '0.4.2', group: :doc


## for es6
gem 'sprockets','3.7.2'
gem 'sprockets-es6', '0.9.2'
gem 'babel-transpiler', '0.7.0'

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

gem 'bootstrap-sass', '3.2.0.4'
gem 'autoprefixer-rails', '9.4.3'
gem 'mini_racer', '0.3.1'
gem 'haml', '5.0.4'
gem 'coffee-script', '2.4.1'
gem 'json', '1.8.6'
gem 'configurable_engine', '0.4.8'
gem 'httparty', '0.13.7'
gem 'will_paginate', '3.3.0'
gem 'daemons', '1.3.1'
gem 'rqrcode', '0.10.1'
gem 'twilio-ruby', '5.18.0'
gem 'carrierwave', '1.2.3'
gem 'rmagick', '2.16.0'
gem 'devise', '4.5.0'
gem 'devise_invitable', '1.7.5'
gem 'font-awesome-rails', '4.7.0.4'
gem 'sidekiq', '5.2.3'
gem "sidekiq-cron", '1.0.4'
gem 'chartkick', '3.4.2'
#gem "auto-session-timeout", '0.9.5'
#gem 'session_timeout_prompter'
gem 'roo', '2.7.1'
gem 'flag-icons-rails', '3.1.0'
gem 'zbar', '0.3.0'
gem 'mini_magick', '4.9.2'
gem 'net-ldap', '0.14.0'
gem 'net-scp', '2.0.0'
gem 'jwt', '2.1.0'
gem 'simple_command', '0.1.0'
gem 'active_model_serializers', '~> 0.10.0'
gem 'telephone_number', '1.3.4'
gem 'connection_pool'

## bulk import - note: this is supported in Rails 6 out of the box
gem 'activerecord-import'
gem 'smarter_csv'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'puma'
  gem 'byebug'
  gem 'minitest', '5.10.3'
  gem 'minitest-reporters'
  gem 'webmock'
  gem 'capybara', '3.15'
  gem 'selenium-webdriver'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

