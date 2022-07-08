class CreateRebootRequests < ActiveRecord::Migration[5.1]
  def change
    create_table :reboot_requests do |t|
      t.integer :endpoint_id
      t.integer :reboot_request, :default=>1
      t.integer :reboot_answered, :default=>0
      t.timestamps
    end
    add_column :endpoints, :wifi_device_id, :string
  end
end
