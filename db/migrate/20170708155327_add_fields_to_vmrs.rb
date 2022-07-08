class AddFieldsToVmrs < ActiveRecord::Migration[5.1]
  def change
    add_column :vmrs, :endpoint_id, :integer
    add_column :vmrs, :call_token, :string
    add_column :vmrs, :start_time, :datetime
    add_column :vmrs, :end_time, :datetime
  end
end
