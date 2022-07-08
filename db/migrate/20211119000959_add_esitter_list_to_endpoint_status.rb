class AddEsitterListToEndpointStatus < ActiveRecord::Migration[5.2]
  def change
    add_column :endpoint_statuses, :esitter_list, :string
  end
end
