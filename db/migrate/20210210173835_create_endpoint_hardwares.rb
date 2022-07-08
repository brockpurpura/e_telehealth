class CreateEndpointHardwares < ActiveRecord::Migration[5.1]
  def change
    create_table :endpoint_hardwares do |t|
      t.integer :endpoint_id
      t.text :devices
      t.string :camera
      t.string :relay_board
      t.string :audio
      t.string :touch_screen
   

      t.timestamps
    end
 
    add_index :endpoint_hardwares, :endpoint_id
  end
end
