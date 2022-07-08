class DropGroupTable < ActiveRecord::Migration[5.1]
  def change
    drop_table :groups
  end
end
