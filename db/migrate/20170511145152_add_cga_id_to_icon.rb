class AddCgaIdToIcon < ActiveRecord::Migration[5.1]
  def change
    add_column :icons, :client_admin_id, :integer
  end
end
