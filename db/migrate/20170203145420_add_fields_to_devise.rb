class AddFieldsToDevise < ActiveRecord::Migration[5.1]
  def change
    add_column :admins, :approved, :integer, :default=>1
    add_column :admins, :authorized, :integer, :default=>0

    create_table :groups do |t|
      t.string :name
      t.integer :status, :default=>1
      t.timestamps null: false
    end

    add_column :users, :group_id, :integer
    
  end
end
