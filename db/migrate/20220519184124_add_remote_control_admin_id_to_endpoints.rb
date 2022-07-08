class AddRemoteControlAdminIdToEndpoints < ActiveRecord::Migration[5.2]
  def change
    add_column :endpoints, :remote_control_admin_id, :integer, :default => nil
  end
end
