class CreateClients < ActiveRecord::Migration[5.1]
  def change
    create_table :clients do |t|
      t.string :client_name
      t.integer :status, :default => 1
      t.timestamps null: false
    end
  end
end
