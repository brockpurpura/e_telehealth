class CreateDeviceTypeNames < ActiveRecord::Migration[5.1]
  def change
    create_table :device_type_names do |t|
      t.string :common_name
      t.string :standard_device_type
      t.integer :active, :default => 1
      t.integer :list_priority, :default => 1
      t.timestamps
    end
    add_column :endpoints, :device_common_name, :string
  end
end
