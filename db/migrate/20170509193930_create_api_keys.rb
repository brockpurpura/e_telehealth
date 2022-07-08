class CreateApiKeys < ActiveRecord::Migration[5.1]
  def change
    create_table :api_keys do |t|
      t.integer :client_id
      t.string :name
      t.string :password_digest
      t.string :elert_callback
      t.string :hangup_callback
      t.timestamps null: false
    end
  end
end
