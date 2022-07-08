class CreateClientAdminApiKeys < ActiveRecord::Migration[5.1]
  def change
    create_table :client_admin_api_keys do |t|
      t.integer :client_admin_id
      t.string :role_prefix
      t.timestamps
    end
  end
end
