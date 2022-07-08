class AddPathToEndpointStatus < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoint_statuses, :home_path, :string
  end
end
