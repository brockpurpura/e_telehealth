class CreateTranslationCodes < ActiveRecord::Migration[5.1]
  def change
    create_table :translation_codes do |t|
      t.integer :translation_type_id
      t.string :name
      t.string :gender
      t.string :prefix 
      t.timestamps
    end
  end
end
