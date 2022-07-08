class AddPrefixToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :admins, :prefix, :string
  end
end
