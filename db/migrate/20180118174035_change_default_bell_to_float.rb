class ChangeDefaultBellToFloat < ActiveRecord::Migration[5.1]
  def change
    change_column :endpoints, :default_bell, :float
  end
end
