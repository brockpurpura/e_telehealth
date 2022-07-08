class AddMoreIndexes < ActiveRecord::Migration[5.1]
  def change
    add_index :admins, :client_id
    add_index :admins, :client_admin_id
    add_index :alert_frequencies, :endpoint_id
    add_index :api_keys, :client_id
    add_index :api_keys, [:api_username, :api_password]
    add_index :bookmarks, :endpoint_id
    add_index :locations, :client_id
    add_index :buildings, :location_id
    add_index :rooms, :building_id
    add_index :endpoints, :room_id
    add_index :clients, :client_admin_id
    add_index :endpoints, [:pin, :machine_name]
    add_index :endpoint_statuses, :endpoint_id
    add_index :icons, :client_id
    add_index :icons, :client_admin_id
    add_index :notifications, :user_id
    add_index :settings, :user_id
    add_index :user_phones, :user_id
    add_index :users, :client_id
    add_index :users_to_clients, [:user_id, :client_id]
    add_index :vmrs, [:on_deck, :set_info]
    add_index :api_calls, [:client_id, :call_token]
    
    drop_table :endpoint_to_users
  end
end
