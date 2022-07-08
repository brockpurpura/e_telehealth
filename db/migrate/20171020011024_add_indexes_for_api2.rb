class AddIndexesForApi2 < ActiveRecord::Migration[5.1]
  def change
    add_index :api_calls, :call_token
    add_index :users, [:display_name, :api_unique]
  end
end
