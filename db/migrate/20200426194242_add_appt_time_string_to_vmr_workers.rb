class AddApptTimeStringToVmrWorkers < ActiveRecord::Migration[5.1]
  def change
    add_column :vmr_meetings, :appt_time_str, :string
  end
end
