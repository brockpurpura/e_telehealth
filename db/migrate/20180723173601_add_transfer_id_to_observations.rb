class AddTransferIdToObservations < ActiveRecord::Migration[5.1]
  def change
    add_column :observations, :transfer_id, :integer
  end
end
