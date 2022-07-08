class AddGeneralStatus < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoint_statuses, :general_status, :string
  end
end
