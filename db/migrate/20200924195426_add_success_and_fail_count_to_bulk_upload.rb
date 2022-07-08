class AddSuccessAndFailCountToBulkUpload < ActiveRecord::Migration[5.1]
  def change
    add_column :bulk_uploads, :successful_records, :integer, :null => true
    add_column :bulk_uploads, :failed_records, :integer, :null => true
  end
end
