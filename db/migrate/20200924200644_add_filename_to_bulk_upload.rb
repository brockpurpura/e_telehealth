class AddFilenameToBulkUpload < ActiveRecord::Migration[5.1]
  def change
    add_column :bulk_uploads, :original_filename, :string, :null => true
  end
end
