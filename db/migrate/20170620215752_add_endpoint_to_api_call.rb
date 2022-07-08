class AddEndpointToApiCall < ActiveRecord::Migration[5.1]
  def change
    add_column :api_calls, :endpoint_id, :integer
    remove_column :endpoints, :in_use
  end
end
