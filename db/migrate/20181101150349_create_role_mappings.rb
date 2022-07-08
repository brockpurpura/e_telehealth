class CreateRoleMappings < ActiveRecord::Migration[5.1]
  def change
    create_table :role_mappings do |t|
      t.string :system_role
      t.string :third_party_role
      t.string :third_party_type
      t.timestamps
    end
  end
end
