class AddPerfectserveUrlToClients < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :perfectserve_url, :string
  end
end
