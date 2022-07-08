class CreateClientAttributeTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :client_attribute_types do |t|
      t.string :name_tag
      t.string :title_display
      t.integer :group_no
      t.timestamps
    end
  end
end
