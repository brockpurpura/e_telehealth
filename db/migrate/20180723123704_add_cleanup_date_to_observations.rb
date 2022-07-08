class AddCleanupDateToObservations < ActiveRecord::Migration[5.1]
  def change
    add_column :observations, :clean_up_date, :datetime
  end
end
