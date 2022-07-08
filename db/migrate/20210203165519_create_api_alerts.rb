class CreateApiAlerts < ActiveRecord::Migration[5.1]
  def change
    create_table :api_alerts do |t|
      t.integer :endpoint_id
      t.string :alert_instance
      t.timestamps
    end

    add_index :api_alerts, [:endpoint_id, :alert_instance]
  end
end
