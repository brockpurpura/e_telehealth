class AddLocationIdToBuilding < ActiveRecord::Migration[5.1]
  def change
    add_column :buildings, :location_id, :integer    
  end
end
