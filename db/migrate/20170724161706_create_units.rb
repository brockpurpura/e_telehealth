class CreateUnits < ActiveRecord::Migration[5.1]
  def change
    create_table :units do |t|
      t.string :name
      t.string :main_enclosure_tag
      t.string :lower_enclosure_tag
      t.integer :endpoint_id
      t.timestamps
    end
  end
end
