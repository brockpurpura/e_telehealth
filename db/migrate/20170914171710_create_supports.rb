class CreateSupports < ActiveRecord::Migration[5.1]
  def change
    create_table :supports do |t|
      t.string :name
      t.string :document
      t.timestamps
    end
  end
end
