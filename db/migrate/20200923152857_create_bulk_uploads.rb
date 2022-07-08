class CreateBulkUploads < ActiveRecord::Migration[5.1]
  def change
    create_table :bulk_uploads do |t|
      t.string :import_type
      t.references :admin, foreign_key: false 
      t.string :status
      t.string :source_file
      t.integer :total_records
      t.integer :processed_records
      t.text :report

      t.timestamps
    end
  end
end
