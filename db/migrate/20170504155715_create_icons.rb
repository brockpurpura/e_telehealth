class CreateIcons < ActiveRecord::Migration[5.1]
  def change
    create_table :icons do |t|
      t.string :name
      t.string :attachment
      t.integer :client_id
      t.integer :status
      t.string :banner_color
      t.string :font_color

      t.timestamps null: false
    end
  end
end
