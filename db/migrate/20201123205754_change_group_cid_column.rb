class ChangeGroupCidColumn < ActiveRecord::Migration[5.1]
  def change
    rename_column :vmr_meetings, :group_cid, :csn
  end
end
