class CreateVersionReleases < ActiveRecord::Migration[5.1]
  def change
    create_table :version_releases do |t|
      t.integer :endpoint_id
      t.string :version
      t.integer :try_count, :default=> 0
      t.timestamps
    end
  end
end
