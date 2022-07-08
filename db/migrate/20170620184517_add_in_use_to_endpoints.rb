class AddInUseToEndpoints < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoints, :in_use, :integer, :default=>0
  end
end
