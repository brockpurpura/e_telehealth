class AddCpuStatsToEndpoint < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoint_statuses, :cpu_current_load, :float
    add_column :endpoint_statuses, :total_mem, :float
    add_column :endpoint_statuses, :free_mem, :float
    add_column :endpoint_statuses, :used_mem, :float
    add_column :endpoint_statuses, :avail_mem, :float
  end
end
