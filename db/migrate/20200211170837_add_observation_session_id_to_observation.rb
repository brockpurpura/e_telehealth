class AddObservationSessionIdToObservation < ActiveRecord::Migration[5.1]
  def change
    add_column :observations, :observation_session_id, :integer
  end
end
