class AddIndexToMeetingParticipants < ActiveRecord::Migration[5.1]
  def change
    add_index :meeting_participants, [:vmr_meeting_id, :user_id, :p_uuid] , :name => 'index_for_duplicate_search'
  end
end
