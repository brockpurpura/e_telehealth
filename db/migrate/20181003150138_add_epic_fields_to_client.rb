class AddEpicFieldsToClient < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :interconnect_server, :string
    add_column :clients, :interconnect_username, :string
    add_column :clients, :interconnect_password, :string
  end
end
