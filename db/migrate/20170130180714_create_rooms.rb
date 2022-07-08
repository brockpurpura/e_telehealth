class CreateRooms < ActiveRecord::Migration[5.1]
  def change
    create_table :rooms do |t|
      t.integer :building_id
      t.string :name
      t.timestamps null: false
    end
  end
end
