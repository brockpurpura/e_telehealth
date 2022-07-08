class AddApiData < ActiveRecord::Migration[5.1]
  def change
    add_column :api_keys, :api_username, :string
    add_column :api_keys, :api_password, :string
    add_column :api_keys, :api_encrypt_key, :string
  end
end
