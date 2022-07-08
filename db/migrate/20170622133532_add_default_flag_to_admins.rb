class AddDefaultFlagToAdmins < ActiveRecord::Migration[5.1]
  def change
    add_column :admins, :default_admin, :integer, :default=>0
  end
end
