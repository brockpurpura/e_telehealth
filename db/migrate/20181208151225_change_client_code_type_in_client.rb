class ChangeClientCodeTypeInClient < ActiveRecord::Migration[5.1]
  def change
    change_column :clients, :translation_customer_code, :string
  end
end
