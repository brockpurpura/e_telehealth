class CreateWebsocketCommands < ActiveRecord::Migration[5.1]
  def change
    create_table :websocket_commands do |t|
      t.string :batch_name
      t.integer :endpoint_id
      t.string :command
      t.timestamps
    end

    add_index :websocket_commands, [:batch_name, :endpoint_id]
  end
end
