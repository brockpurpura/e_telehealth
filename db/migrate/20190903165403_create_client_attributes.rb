class CreateClientAttributes < ActiveRecord::Migration[5.1]
  def change
    create_table :client_attributes do |t|
      t.integer :client_id
      t.integer :client_attribute_type_id
      t.string :value 
      t.timestamps
    end
  end
end
