class CreateAlertFrequencies < ActiveRecord::Migration[5.1]
  def change
    create_table :alert_frequencies do |t|
      t.integer :endpoint_id
      t.datetime :a_last_call
      t.timestamps null: false
    end
  end
end
