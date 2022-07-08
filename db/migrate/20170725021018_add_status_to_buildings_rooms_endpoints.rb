class AddStatusToBuildingsRoomsEndpoints < ActiveRecord::Migration[5.1]
  def change
    add_column :buildings, :status, :integer, :defaults => 1
    add_column :rooms, :status, :integer, :defaults => 1
    add_column :endpoints, :status, :integer, :defaults => 1
  end
end
