class AddIndexToLocations < ActiveRecord::Migration[5.1]
  def change
    add_index :locations, [:client_id, :id]
    add_index :buildings, [:location_id, :id]
    add_index :rooms, [:building_id, :id]
    add_index :endpoints, [:room_id, :id]
  end
end
