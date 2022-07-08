class CreateEpicApiResults < ActiveRecord::Migration[5.1]
  def change
    create_table :epic_api_results do |t|
      t.integer :vmr_meeting_id
      t.string :cid
      t.string :ext_user_id
      t.string :usertype
      t.string :vendor_name
      t.string :connect_status
      t.string :api_result
      t.string :api_message
      t.timestamps
    end
  end
end
