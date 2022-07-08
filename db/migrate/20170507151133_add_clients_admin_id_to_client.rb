class AddClientsAdminIdToClient < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :client_admin_id, :integer    
  end
end
