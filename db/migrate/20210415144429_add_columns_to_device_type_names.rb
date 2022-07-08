class AddColumnsToDeviceTypeNames < ActiveRecord::Migration[5.1]
  def change
    add_column :device_type_names, :camera_brightness_adjustment, :boolean
    add_column :device_type_names, :camera_focus_adjustment, :boolean
    add_column :device_type_names, :nightview, :boolean
    add_column :device_type_names, :can_hard_reboot, :boolean
    add_column :device_type_names, :has_sony_camera, :boolean
    add_column :device_type_names, :active_device_type, :boolean
    add_column :device_type_names, :has_battery, :boolean
  end
end
