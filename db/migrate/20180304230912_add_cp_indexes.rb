class AddCpIndexes < ActiveRecord::Migration[5.1]
  def change
    add_index :call_participants, [:vmr_id, :user_id]
    add_index :call_participants, :p_uuid 
  end
end
