class AddFieldsToVmr < ActiveRecord::Migration[5.1]
  def change
    add_column :vmrs, :on_deck, :integer, :default => 1
    add_column :vmrs, :used_by, :integer
  end
end
