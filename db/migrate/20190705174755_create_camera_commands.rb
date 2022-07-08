class CreateCameraCommands < ActiveRecord::Migration[5.1]
  def change
    create_table :camera_commands do |t|
      t.integer :endpoint_id 
      t.string :command_name
      t.timestamps
    end
  end
end
