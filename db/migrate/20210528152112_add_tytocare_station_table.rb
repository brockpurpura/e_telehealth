class AddTytocareStationTable < ActiveRecord::Migration[5.1]
  def change
    create_table :tyto_care_stations do |t|
      t.string :station_id
      t.string :tyto_visit_id
      t.integer :endpoint_id
      t.integer :clinician_id
      t.string :device_serial_number
      t.string :public_ip
      t.timestamps
    end
  end
end