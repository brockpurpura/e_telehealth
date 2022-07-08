class CreateTransfers < ActiveRecord::Migration[5.1]
  def change
    create_table :transfers do |t|
      t.integer :observation_id
      t.integer :requesting_admin_id
      t.integer :answer_admin_id
      t.string :reason
      t.timestamps
    end
  end
end
