class AddHealthWeightToEndpointStatus < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoint_statuses, :error_weight, :integer, :default=> 0
  end
end
