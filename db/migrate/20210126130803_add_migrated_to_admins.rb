class AddMigratedToAdmins < ActiveRecord::Migration[5.1]
  def change
    add_column :admins, :migrated, :integer, :default => 0
  end
end
