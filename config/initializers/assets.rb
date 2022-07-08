# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'


Rails.application.config.assets.paths << "#{Rails.root}/app/assets/fonts"
Rails.application.config.assets.paths << "#{Rails.root}/app/assets/obs_pre"
Rails.application.config.assets.paths << "#{Rails.root}/app/assets/img"
Rails.application.config.assets.paths << "#{Rails.root}/app/assets/stylesheets/images"

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w(inputmask.js jquery.inputmask.js webrtc.js live_charts.js docs.css mobile.css mobile.js observation.css adapter.js socket.io.js observer_helper.js sweetalert.min.js action_cable.js cable.js obs_pre.js observer_helper.js chartkick.js devise_menu.scss clinician.scss style.scss admin.scss univago_admin.scss tech.scss components.scss keyboard-controls.js keyboard-mover-controls meetings.scss)
