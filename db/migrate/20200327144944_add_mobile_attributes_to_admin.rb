class AddMobileAttributesToAdmin < ActiveRecord::Migration[5.1]
  def change
    add_column :admins, :mobile_location_id,      :integer
    add_column :admins, :mobile_unit_id,          :integer
    add_column :admins, :mobile_alias,            :string
    add_column :admins, :mobile_notification_url, :string
  end
end
