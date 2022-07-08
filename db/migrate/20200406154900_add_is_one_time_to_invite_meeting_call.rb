class AddIsOneTimeToInviteMeetingCall < ActiveRecord::Migration[5.1]
  def change
    add_column :invite_meeting_calls, :is_one_time, :boolean
  end
end
