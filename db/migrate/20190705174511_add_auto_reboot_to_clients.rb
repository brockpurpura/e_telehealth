class AddAutoRebootToClients < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :auto_reboot, :integer, :default=>0
  end
end
