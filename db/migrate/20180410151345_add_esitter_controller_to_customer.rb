class AddEsitterControllerToCustomer < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :esitter_controller, :string
    add_column :endpoints, :esitter_on, :integer, :default => 0
  end
end
