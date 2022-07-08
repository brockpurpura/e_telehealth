class CreateBatchRows < ActiveRecord::Migration[5.1]
  def change
    create_table :batch_rows do |t|
      t.string :batch_id
      t.string :status
      t.text :data
      t.string :file_row
      t.string :report
      t.timestamps      
    end
  end
end