class AddDoorbellToEndpoint < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoints, :default_bell, :integer, :default=>5
    add_column :endpoints, :ip4v, :string
    add_column :endpoints, :netmask, :string
    add_column :endpoints, :gateway, :string
  end
end
