class AddMacAddressToEndpointStatuses < ActiveRecord::Migration[5.2]
  def change
    add_column :endpoint_statuses, :mac_address, :string
  end
end
