class SupportLayerx < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :use_layerx, :integer, :default=>0
    add_column :clients, :layerx_username, :string
    add_column :clients, :layerx_dashboard_id, :string
    add_column :client_admins, :use_layerx, :integer, :default=>0
    add_column :client_admins, :layerx_username, :string
    add_column :client_admins, :layerx_dashboard_id, :string
  end
end
