class AddApiIdToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :api_unique, :integer, :default => -1
  end
end
