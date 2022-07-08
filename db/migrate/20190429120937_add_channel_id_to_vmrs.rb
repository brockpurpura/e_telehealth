class AddChannelIdToVmrs < ActiveRecord::Migration[5.1]
  def change
    add_column :vmrs, :client_admin_id, :integer
    add_column :vmr_meetings, :client_admin_id, :integer
  end
end
