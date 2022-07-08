class AddContentSharingOptionToCustomers < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :content_sharing_enabled, :integer, :default=> 0
  end
end
