class CreateObservations < ActiveRecord::Migration[5.1]
  def change
    create_table :observations do |t|
      t.integer :endpoint_id
      t.integer :admin_id
      t.datetime :start_time
      t.datetime :end_time
      t.integer :transferred, :default => 0

      t.timestamps
    end

    change_column_default :endpoints, :esitter_on, 1
  end
end
