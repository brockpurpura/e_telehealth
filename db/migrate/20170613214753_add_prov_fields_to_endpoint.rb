class AddProvFieldsToEndpoint < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoints, :default_input, :float, :default => 6
    add_column :endpoints, :default_output, :float, :default => 5
    add_column :endpoints, :show_icr, :integer, :default => 1
    add_column :endpoints, :show_camera, :integer, :default => 1
    add_column :endpoints, :allow_privacy, :integer, :default => 1
  end
end
