class AddIsApiToVmrs < ActiveRecord::Migration[5.1]
  def change
    add_column :vmrs, :is_api, :boolean
  end
end
