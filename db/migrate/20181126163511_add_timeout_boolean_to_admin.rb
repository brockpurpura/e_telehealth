class AddTimeoutBooleanToAdmin < ActiveRecord::Migration[5.1]
  def change
    add_column :admins, :should_timeout, :integer, :default=>0
  end
end
