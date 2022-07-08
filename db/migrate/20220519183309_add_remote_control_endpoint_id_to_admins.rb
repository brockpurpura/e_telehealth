class AddRemoteControlEndpointIdToAdmins < ActiveRecord::Migration[5.2]
  def change
    add_column :admins, :remote_control_endpoint_id, :integer, :default => nil
  end
end
