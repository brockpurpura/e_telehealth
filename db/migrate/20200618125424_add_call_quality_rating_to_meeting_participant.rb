class AddCallQualityRatingToMeetingParticipant < ActiveRecord::Migration[5.1]
  def change
    add_column :meeting_participants, :call_quality_rating, :integer
  end
end
