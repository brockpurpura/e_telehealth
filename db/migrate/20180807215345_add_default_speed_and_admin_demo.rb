class AddDefaultSpeedAndAdminDemo < ActiveRecord::Migration[5.1]
  def change
   add_column :endpoints, :default_speed, :integer, :default=>5
   add_column :admins, :allow_demo, :integer, :default=>0
  end
end
