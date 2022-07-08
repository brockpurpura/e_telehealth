class AddMobileFlagToAdmin < ActiveRecord::Migration[5.1]
  def change
    add_column :admins, :is_mobile_user,    :boolean, null: false, default: false
    add_column :admins, :mobile_role,       :string
    add_column :admins, :mobile_specialty,  :string
    add_index  :admins, :is_mobile_user
  end
end
