class AddEndpointIdToVmrMeetings < ActiveRecord::Migration[5.1]
  def change
    add_column :vmr_meetings, :endpoint_id, :string
  end
end
