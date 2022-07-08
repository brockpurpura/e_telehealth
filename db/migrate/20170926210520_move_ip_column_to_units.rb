class MoveIpColumnToUnits < ActiveRecord::Migration[5.1]
  def change
    remove_column :endpoints, :internal_ip
    add_column :units, :internal_ip, :string
  end
end
