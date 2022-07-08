class CreateUnitHistories < ActiveRecord::Migration[5.1]
  def change
    create_table :unit_histories do |t|
      t.integer :unit_id
      t.integer :endpoint_id
      t.timestamps
    end
  end
end
