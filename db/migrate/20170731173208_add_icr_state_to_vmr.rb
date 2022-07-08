class AddIcrStateToVmr < ActiveRecord::Migration[5.1]
  def change
    add_column :vmrs, :icr_state, :integer, :default=>0
  end
end
