class AddStaticIpStatusToEndpoints < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoints, :static_ip_status, :integer, :defaults => 0
  end
end
