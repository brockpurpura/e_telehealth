class CreateEndpoints < ActiveRecord::Migration[5.1]
  def change
    create_table :endpoints do |t|
      t.integer :room_id
      t.string :name
      t.string :alias 
      t.string :uri
      t.string :protocol
      t.timestamps null: false
    end
  end
end
