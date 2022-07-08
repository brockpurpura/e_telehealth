class AddUniqueApiIdToNotifications < ActiveRecord::Migration[5.1]
  def change
    add_column :notifications, :unique_api_id, :string
  end
end
