class CreateInviteMeetingCalls < ActiveRecord::Migration[5.1]
  def change
    create_table :invite_meeting_calls do |t|
      t.integer :vmr_meeting_id
      t.integer :user_id
      t.string :call_token
      t.string :invite_email
      t.integer :expire_amount, :default => 30
      t.integer :client_id
      t.timestamps
    end

    add_index :invite_meeting_calls, :call_token

  end
end
