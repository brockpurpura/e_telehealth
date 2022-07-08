class AddVmrIdToApiCalls < ActiveRecord::Migration[5.1]
  def change
    add_column :api_calls, :vmr_id, :integer
    add_column :call_participants, :display_name, :string
  end
end
