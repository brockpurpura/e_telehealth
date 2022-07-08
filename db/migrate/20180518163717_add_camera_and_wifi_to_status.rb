class AddCameraAndWifiToStatus < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoint_statuses, :camera_port_good, :integer, :default=>0
    add_column :endpoint_statuses, :wifi_enabled, :integer, :default=>0
  end
end
