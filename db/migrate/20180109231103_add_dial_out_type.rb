class AddDialOutType < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoints, :dial_out_type, :string, :default=>'SIP'
  end
end
