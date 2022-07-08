class AddComponents < ActiveRecord::Migration[5.1]
  def change
    create_table :components do |t|
      t.belongs_to :endpoint, index: true
      t.string :part_type
      t.string :image_type
      t.string :upc 
      t.datetime :retired_at
      t.string :image

      t.timestamps
    end

  end
end
