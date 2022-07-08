class CreateApiCalls < ActiveRecord::Migration[5.1]
  def change
    create_table :api_calls do |t|
      t.integer :client_id
      t.string :call_token
      t.text :call_params

      t.timestamps
    end
  end
end
