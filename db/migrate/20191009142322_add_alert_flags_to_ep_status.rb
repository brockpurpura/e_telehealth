class AddAlertFlagsToEpStatus < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoint_statuses, :camera_alert_time, :datetime
    add_column :endpoint_statuses, :camera_alert_sent, :integer, :default => 0
    add_column :endpoint_statuses, :visca_alert_time, :datetime
    add_column :endpoint_statuses, :visca_alert_sent, :integer, :default => 0
  end
end
