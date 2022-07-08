class AddIndexToVmrTable < ActiveRecord::Migration[5.1]
  def change
    add_index :vmrs, [:on_deck, :set_info, :client_admin_id]
    add_index :vmr_meetings, [:on_deck, :set_info, :client_admin_id]
  end
end
