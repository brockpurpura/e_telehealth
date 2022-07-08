class AddDeletedToApiKeys < ActiveRecord::Migration[5.1]
  def change
    add_column :api_keys, :deleted, :integer, :default => 0
  end
end
