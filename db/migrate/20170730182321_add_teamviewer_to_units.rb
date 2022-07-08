class AddTeamviewerToUnits < ActiveRecord::Migration[5.1]
  def change
    add_column :units, :teamviewer, :string
  end
end
