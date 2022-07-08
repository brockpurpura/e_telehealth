class CreateInviteCalls < ActiveRecord::Migration[5.1]
  def change
    create_table :invite_calls do |t|
      t.integer :vmr_id
      t.integer :user_id
      t.string :call_token
      t.string :invite_email
      t.integer :expire_amount, :default => 30
      t.timestamps
    end
   
    add_index :invite_calls, :call_token
  end
end
