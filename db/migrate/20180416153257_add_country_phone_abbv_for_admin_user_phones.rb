class AddCountryPhoneAbbvForAdminUserPhones < ActiveRecord::Migration[5.1]
  def change
    add_column :admins, :country_phone_abbv, :string, :default=>'us'

    add_column :user_phones, :country_phone_abbv, :string, :default=>'us'
  end
end
