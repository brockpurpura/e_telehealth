class CreateUsersToClients < ActiveRecord::Migration[5.1]
  def change
    create_table :users_to_clients do |t|
      t.integer :user_id
      t.integer :client_id
      t.timestamps
    end
  end
end
