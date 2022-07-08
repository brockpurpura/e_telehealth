class AddTranslationToCustomer < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :translation_type_id, :integer, :default=>0
  end
end
