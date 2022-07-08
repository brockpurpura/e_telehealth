class AddFieldsToEndpointHardwares < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoint_hardwares, :machine_serial_number, :string
    add_column :endpoint_hardwares, :machine_os, :string
    add_column :endpoint_hardwares, :machine_dist, :string
    add_column :endpoint_hardwares, :machine_codename, :string
    add_column :endpoint_hardwares, :machine_release, :string
  end
end
