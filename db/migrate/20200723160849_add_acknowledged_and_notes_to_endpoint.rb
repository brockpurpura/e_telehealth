class AddAcknowledgedAndNotesToEndpoint < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoints, :acknowledged_id, :integer, :null => true
    add_column :endpoints, :notes, :text, :null => true
  end
end
