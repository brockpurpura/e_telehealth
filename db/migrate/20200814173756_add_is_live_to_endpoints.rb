class AddIsLiveToEndpoints < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoints, :is_live, :integer, :default => 1
  end
end
