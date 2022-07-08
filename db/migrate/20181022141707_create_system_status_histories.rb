class CreateSystemStatusHistories < ActiveRecord::Migration[5.1]
  def change
    create_table :system_status_histories do |t|
      t.integer :endpoint_id
      t.string :change_subject
      t.string :change_message
      t.integer :alert_status, :default=> 1
      t.timestamps
    end
  end
end
