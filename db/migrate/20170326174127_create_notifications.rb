class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.integer :user_id
      t.integer :endpoint_id
      t.string :message
      t.string :room_info
      t.integer :status, :default => 1
      t.timestamps null: false
    end
    create_table :endpoint_to_users do |t|
      t.integer :user_id
      t.integer :endpoint_id
      t.integer :status, :default => 1
      t.timestamps null: false
    end
    create_table :user_phones do |t|
      t.integer :user_id 
      t.string :cell_phone
      t.timestamps null: false
    end
    add_column :users, :prefix, :string
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
  end

end
