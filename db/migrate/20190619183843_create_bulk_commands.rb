class CreateBulkCommands < ActiveRecord::Migration[5.1]
  def change
    create_table :bulk_commands do |t|
      t.integer :endpoint_id 
      t.string :command_name 
      t.integer :waiting_to_run, :default => 1
      t.timestamps
    end
    add_index :bulk_commands, [:endpoint_id, :command_name]
    add_index :bulk_commands, [:endpoint_id, :command_name, :waiting_to_run], :name=>'waiting_to_run_index'
  end
end
