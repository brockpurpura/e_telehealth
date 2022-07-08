class AddAdminIdToUserTable < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :matched_admin_id, :integer
  end
end
