class CreateBookmarks < ActiveRecord::Migration[5.1]
  def change
    create_table :bookmarks do |t|
      t.integer :endpoint_id
      t.integer :user_id
      t.string :name
      t.string :internal_name

      t.timestamps null: false
    end
  end
end
