class AddIndexesToNotifications < ActiveRecord::Migration[5.1]
  def change
    add_index :notifications, [:answered_user_id, :created_at]
    add_index :notifications, [:created_at]
  end
end
