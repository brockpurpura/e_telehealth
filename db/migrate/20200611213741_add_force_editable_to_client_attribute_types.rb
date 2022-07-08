class AddForceEditableToClientAttributeTypes < ActiveRecord::Migration[5.1]
  def change
    add_column :client_attribute_types, :force_editable, :boolean
  end
end
