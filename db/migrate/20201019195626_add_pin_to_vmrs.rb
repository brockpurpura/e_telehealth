class AddPinToVmrs < ActiveRecord::Migration[5.1]
  def change
    add_column :vmrs, :host_pin, :string, :default => '0'
    add_column :vmrs, :guest_pin, :string, :default => '0'
    add_column :vmr_meetings, :host_pin, :string, :default => '0'
    add_column :vmr_meetings, :guest_pin, :string, :default => '0'
  end
end
