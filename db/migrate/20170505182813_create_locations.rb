class CreateLocations < ActiveRecord::Migration[5.1]
  def change
    create_table :locations do |t|
      t.integer :client_id
      t.string :name
      t.string :address1
      t.string :city
      t.string :state
      t.string :zip
      t.string :country
      t.timestamps null: false
    end
  end
end
