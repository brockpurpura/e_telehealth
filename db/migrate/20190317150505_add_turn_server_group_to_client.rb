class AddTurnServerGroupToClient < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :group_turn_server_name, :string
  end
end
