class CreateRoles < ActiveRecord::Migration[5.1]
  def change
    create_table :roles do |t|
      t.integer :admin_id
      t.string :role_type
      t.timestamps
    end
  end
end
