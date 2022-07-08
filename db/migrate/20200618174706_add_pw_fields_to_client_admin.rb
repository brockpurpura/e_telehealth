class AddPwFieldsToClientAdmin < ActiveRecord::Migration[5.1]
  def change
    add_column :client_admins, :hide_wifi_pw, :integer, :default => 0
    add_column :client_admins, :show_wifi_tech, :integer, :default => 0
  end
end
