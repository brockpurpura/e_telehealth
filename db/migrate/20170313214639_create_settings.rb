class CreateSettings < ActiveRecord::Migration[5.1]
  def change
    create_table :settings do |t|
      t.integer :user_id
      t.integer :volume
      t.integer :brightness
      t.integer :speed
      t.integer :privacy
      t.integer :announce
      t.timestamps null: false
    end
  end
end
