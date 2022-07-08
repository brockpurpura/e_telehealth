class AddClinicianSidebarSelectionToClient < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :clinician_sidebutton_layout, :integer, :default => 0    	  
  end
end
