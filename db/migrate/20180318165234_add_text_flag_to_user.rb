class AddTextFlagToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :text_flag, :integer, :default => 1
    add_column :endpoints, :teamviewer_on, :integer, :default => 1
  end
end
