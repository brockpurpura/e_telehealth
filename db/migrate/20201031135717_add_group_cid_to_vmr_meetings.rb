class AddGroupCidToVmrMeetings < ActiveRecord::Migration[5.1]
  def change
    add_column :vmr_meetings, :group_cid, :string
  end
end
