class AddTranslationCustomerDetails < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :translation_customer_code, :integer
    add_column :translation_types, :use_skill, :integer, :default => 0
    add_column :translation_codes, :skill, :string
  end
end
