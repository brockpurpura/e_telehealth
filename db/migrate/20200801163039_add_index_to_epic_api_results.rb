class AddIndexToEpicApiResults < ActiveRecord::Migration[5.1]
  def change
    add_index :epic_api_results, [:cid, :api_result, :connect_status], :name => 'cid_result_status_idx'
  end
end
