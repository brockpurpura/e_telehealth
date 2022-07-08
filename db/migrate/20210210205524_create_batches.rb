class CreateBatches < ActiveRecord::Migration[5.1]
  def change
    create_table :batches do |t| 
      t.string :status
      t.string :total_records
      t.string :succeeded_count
      t.string :failed_count
      t.string :original_filename
      t.string :source_file
      t.string :import_type
      t.integer :admin_id
      t.timestamps
    end
  end
end