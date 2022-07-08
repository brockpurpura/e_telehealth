class AddEndTimeToObservationActivity < ActiveRecord::Migration[5.1]
  def change
    add_column :observation_activities, :end_time, :timestamp 
  end
end
