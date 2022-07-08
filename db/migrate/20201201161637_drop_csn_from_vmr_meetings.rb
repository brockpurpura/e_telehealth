class DropCsnFromVmrMeetings < ActiveRecord::Migration[5.1]
  def change
    remove_column :vmr_meetings, :csn
  end
end
