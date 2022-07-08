class AddEndpointValues < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoints, :pin, :integer
    add_column :endpoints, :type, :string
    add_column :endpoints, :tunnel, :string
    remove_column :endpoints, :uri
  end
end
