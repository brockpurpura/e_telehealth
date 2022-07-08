class CreateObservationSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :observation_sessions do |t|
      t.integer :admin_id
      t.string :admin_name
      t.timestamps
    end
  end
end
