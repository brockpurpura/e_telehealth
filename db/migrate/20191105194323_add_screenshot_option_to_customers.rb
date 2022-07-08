class AddScreenshotOptionToCustomers < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :screenshot_enabled, :integer, :default=> 1
  end
end
