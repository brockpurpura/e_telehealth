class AddTechApprovedToAdmins < ActiveRecord::Migration[5.1]
  def change
    add_column :admins, :tech_approved, :integer, :default=>0
  end
end
