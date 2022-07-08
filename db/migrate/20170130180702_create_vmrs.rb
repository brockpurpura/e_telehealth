class CreateVmrs < ActiveRecord::Migration[5.1]
  def change
    create_table :vmrs do |t|
      t.string :name
      t.string :uri
      t.string :alias
      t.datetime :destroyed_at

      t.timestamps null: false
    end
  end
end
