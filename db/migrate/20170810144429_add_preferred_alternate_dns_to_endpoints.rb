class AddPreferredAlternateDnsToEndpoints < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoints, :preferred_dns, :string
    add_column :endpoints, :alternate_dns, :string
  end
end
