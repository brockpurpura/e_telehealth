class CreateEncryptedApis < ActiveRecord::Migration[5.1]
  def change
    create_table :encrypted_apis do |t|
      t.string :encrypted_string

      t.timestamps
    end
  end
end
