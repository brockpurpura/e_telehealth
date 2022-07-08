class AddTransferedIdToObservations < ActiveRecord::Migration[5.1]
  def change
    add_column :observations, :transfer_observation_id, :integer
    add_column :observations, :transferred_admin_id, :integer
    add_column :observations, :transfer_reason, :string
    remove_column :transfers, :observation_id
  end
end
