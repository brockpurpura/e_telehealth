class AddIpToEndpoint < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoints, :internal_ip, :string
  end
end
