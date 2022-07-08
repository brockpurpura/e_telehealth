class AddUserAnsweredNotif < ActiveRecord::Migration[5.1]
  def change
    add_column :notifications, :answered_user_id, :integer
  end
end
