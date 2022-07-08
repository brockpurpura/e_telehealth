require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  Selenium::WebDriver.logger.level = :error
  # To watch what's happening use 'driven_by :selenium'
  driven_by :selenium , using: :chrome, screen_size: [1400, 1400]
  #driven_by :selenium_chrome_headless

  def teardown
    take_failed_screenshot
  end
end
