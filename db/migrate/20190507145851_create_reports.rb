class CreateReports < ActiveRecord::Migration[5.1]
  def change
    create_table :reports do |t|
      t.integer :admin_id
      t.string :report_url
      t.integer :active, :default => 1
      t.string :report_desc
      t.string :report_type
      t.timestamps
    end
  end
end
