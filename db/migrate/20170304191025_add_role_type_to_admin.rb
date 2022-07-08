class AddRoleTypeToAdmin < ActiveRecord::Migration[5.1]
  def change
    add_column :admins, :role_type, :integer, :default=>1
  end
end
