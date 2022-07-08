class AddKeyToApiKeys < ActiveRecord::Migration[5.1]
  def change
    add_column :api_keys, :role_prefix, :string
  end
end
