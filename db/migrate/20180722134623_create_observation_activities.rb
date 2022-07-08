class CreateObservationActivities < ActiveRecord::Migration[5.1]
  def change
    create_table :observation_activities do |t|
      t.integer :observation_id
      t.string :activity_type
      t.string :reason
      t.integer :admin_id
      t.timestamps
    end
  end
end
