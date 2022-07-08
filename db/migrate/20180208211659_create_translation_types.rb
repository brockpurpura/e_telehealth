class CreateTranslationTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :translation_types do |t|
      t.string :name
      t.integer :use_domain
      t.integer :use_gender
      t.string :domain
      t.string :male, :default => '-1'
      t.string :female, :default => '-1'
      t.string :any, :default => '-1'
      t.timestamps
    end
  end
end
