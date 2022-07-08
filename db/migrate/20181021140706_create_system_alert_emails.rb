class CreateSystemAlertEmails < ActiveRecord::Migration[5.1]
  def change
    create_table :system_alert_emails do |t|
      t.integer :client_id
      t.integer :alert_number
      t.integer :alert_level
      t.string :email
      t.timestamps
    end
  end
end
