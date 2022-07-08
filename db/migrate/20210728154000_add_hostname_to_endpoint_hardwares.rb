class AddHostnameToEndpointHardwares < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoint_hardwares, :hostname, :string
    add_column :endpoint_hardwares, :system_vin, :string
  end
end
