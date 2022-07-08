class AddMaintanenceToEndpoint < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoints, :under_maintenance, :integer, :default=> 0
    add_column :endpoints, :conference_node, :string
  end
end
