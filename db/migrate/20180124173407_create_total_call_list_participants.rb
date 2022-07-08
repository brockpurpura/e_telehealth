class CreateTotalCallListParticipants < ActiveRecord::Migration[5.1]
  def change
    create_table :total_call_list_participants do |t|
      t.integer :vmr_id
      t.string :p_uuid
      t.string :display_name
      t.timestamps
    end
  end
end
