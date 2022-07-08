class CreateAdminsToClients < ActiveRecord::Migration[5.1]
  def change
    create_table :admins_to_clients do |t|
      t.integer :admin_id
      t.integer :client_id
      t.timestamps
    end
    add_index :admins_to_clients, [:admin_id, :client_id]
  end
end
