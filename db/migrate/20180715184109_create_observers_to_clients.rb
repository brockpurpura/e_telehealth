class CreateObserversToClients < ActiveRecord::Migration[5.1]
  def change
    create_table :observers_to_clients do |t|
      t.integer :admin_id
      t.integer :client_id
      t.timestamps
    end
  end
end
