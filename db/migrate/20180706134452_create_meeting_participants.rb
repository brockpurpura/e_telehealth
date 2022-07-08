class CreateMeetingParticipants < ActiveRecord::Migration[5.1]
  def change
    create_table :meeting_participants do |t|
      t.integer :vmr_meeting_id
      t.integer :user_id
      t.string :usertype
      t.string :org_id
      t.string :cid 
      t.datetime :appt_time
      t.string :p_uuid
      t.string :display_name
      t.integer :invited, :default=>0
      t.string :role
      t.timestamps
    end
  end
end
