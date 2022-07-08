class ChangeTypeName < ActiveRecord::Migration[5.1]
  def change
    rename_column :endpoints, :type, :endpoint_type
  end
end
