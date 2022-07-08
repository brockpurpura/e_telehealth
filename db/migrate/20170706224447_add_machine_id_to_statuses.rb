class AddMachineIdToStatuses < ActiveRecord::Migration[5.1]
  def change  
    add_column :endpoint_statuses, :machine_id, :string
  end
end
