class AddSendToDeviceEndpointAttributes < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoint_attribute_types, :send_to_device, :integer
    add_column :endpoint_attribute_types, :group_no, :integer
    add_column :endpoint_attribute_types, :name_tag, :string
    add_column :client_attribute_types, :send_to_device, :integer
  end
end
