class CreateThemes < ActiveRecord::Migration[5.1]
  def change
    create_table :themes do |t|
      t.integer :theme_id
      t.string :name
      t.string :uri
      t.string :uuid 
      t.timestamps
    end
  end
end
