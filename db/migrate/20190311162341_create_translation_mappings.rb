class CreateTranslationMappings < ActiveRecord::Migration[5.1]
  def change
    create_table :translation_mappings do |t|
      t.integer :translation_type_id
      t.integer :client_id
      t.string :uri
      t.string :description
      t.string :gender
      t.timestamps
    end
    add_column :translation_types, :use_mapping, :integer, :default=>0
  end
end
