class AddElertUrlToEndpoint < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoints, :elert_url, :string
  end
end
