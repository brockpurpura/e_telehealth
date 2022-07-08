class CreateSmallUrls < ActiveRecord::Migration[5.1]
  def change
    create_table :small_urls do |t|
      t.string :large_url
      t.string :small_url
      t.timestamps
    end
  end
end
