class CreateLicenses < ActiveRecord::Migration[5.1]
  def change
    create_table :licenses do |t|
      t.text :license_type
      t.text :license_key
      t.timestamps
    end
  end
end
