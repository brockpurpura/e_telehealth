class AddUpdatedToVmrs < ActiveRecord::Migration[5.1]
  def change
    add_column :vmrs, :set_info, :integer, :default=>0
  end
end
