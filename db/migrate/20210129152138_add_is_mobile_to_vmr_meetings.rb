class AddIsMobileToVmrMeetings < ActiveRecord::Migration[5.1]
  def change
    add_column :vmr_meetings, :is_mobile, :boolean
  end
end
