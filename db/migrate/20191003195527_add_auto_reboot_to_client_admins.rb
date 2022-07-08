class AddAutoRebootToClientAdmins < ActiveRecord::Migration[5.1]
  def change
    add_column :client_admins, :auto_reboot, :integer, :default => 0
    add_column :client_attribute_types, :is_boolean, :integer, :default => 0
    add_column :endpoint_attribute_types, :is_boolean, :integer, :default => 0
  end
end
