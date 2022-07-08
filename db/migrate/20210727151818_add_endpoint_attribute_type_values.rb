class AddEndpointAttributeTypeValues < ActiveRecord::Migration[5.1]
  def change
    create_table :endpoint_attribute_type_values do |t|
      t.belongs_to :endpoint_attribute_type, index: { name: :endp_a_t_v_on_end_a_t_id }, foreign_key: true
      t.string :name
      t.timestamps
    end
  end
end
