class ChangeTeamviewerDefault < ActiveRecord::Migration[5.1]
  def change
    change_column :endpoints, :teamviewer_on, :integer, :default=>0
  end
end
