class CreateEndpointAttributes < ActiveRecord::Migration[5.1]
  def change
    create_table :endpoint_attributes do |t|
      t.integer :endpoint_id
      t.integer :endpoint_attribute_type_id
      t.string :value
      t.timestamps
    end
  end
end
