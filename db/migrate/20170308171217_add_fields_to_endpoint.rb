class AddFieldsToEndpoint < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoints, :machine_name, :string
    add_column :endpoints, :local_ip, :string
  end
end
