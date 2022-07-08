class CreateEndpointAttributeTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :endpoint_attribute_types do |t|
      t.string :description

      t.timestamps
    end
  end
end
