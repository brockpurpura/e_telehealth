class CreateClientAdmins < ActiveRecord::Migration[5.1]
  def change
    create_table :client_admins do |t|
      t.string :name
      t.integer :status, :default=>1
      t.timestamps null: false
    end

    add_column :admins, :client_id, :integer
    add_column :admins, :client_admin_id, :integer
    remove_column :users, :group_id
    add_column :users, :client_id, :integer
   
  end
end
