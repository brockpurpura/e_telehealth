class CreateCallParticipants < ActiveRecord::Migration[5.1]
  def change
    create_table :call_participants do |t|
      t.integer :vmr_id
      t.integer :user_id
      t.string :p_uuid
      t.timestamps
    end
  end
end
