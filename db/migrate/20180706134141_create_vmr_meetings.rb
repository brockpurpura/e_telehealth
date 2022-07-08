class CreateVmrMeetings < ActiveRecord::Migration[5.1]
  def change
    create_table :vmr_meetings do |t|
      t.string :name
      t.string :uri
      t.string :alias 
      t.datetime :destroyed_at
      t.integer :on_deck, :default => 1
      t.integer :client_id
      t.string :used_by_cid
      t.datetime :appt_time
      t.integer :set_info, :default => 0
      t.string :call_token
      t.datetime :start_time
      t.datetime :end_time
      t.timestamps
    end
  end
end
