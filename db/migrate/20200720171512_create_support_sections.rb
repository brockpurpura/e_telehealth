class CreateSupportSections < ActiveRecord::Migration[5.1]
  def change
    create_table :support_sections do |t|
      t.string :name      
      t.timestamps
    end
  end
end
