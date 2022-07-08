class CreateEndpointStatuses < ActiveRecord::Migration[5.1]
  def change
    create_table :endpoint_statuses do |t|
      t.integer :endpoint_id
      t.integer :connect_good, :default => 0
      t.integer :camera_good, :default => 0
      t.integer :usb0_good, :default => 0
      t.integer :usb1_good, :default => 0
      t.integer :in_a_call, :default => 0
      t.integer :configured, :default => 0
      t.integer :update_freq
      t.string :version
      t.datetime :configured_date
      t.datetime :last_update_date
      t.timestamps
    end
  end
end
