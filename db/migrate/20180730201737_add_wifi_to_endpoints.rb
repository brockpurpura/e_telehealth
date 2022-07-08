class AddWifiToEndpoints < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoints, :ssid, :string
    add_column :endpoints, :ssid_password, :string
    add_column :endpoints, :wifi_status, :integer

    
  end
end
