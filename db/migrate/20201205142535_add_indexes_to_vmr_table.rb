class AddIndexesToVmrTable < ActiveRecord::Migration[5.1]
  def change
    add_index :vmrs, :alias
    add_index :vmrs, :used_by
  end
end
