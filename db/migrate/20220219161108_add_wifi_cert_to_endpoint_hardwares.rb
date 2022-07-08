class AddWifiCertToEndpointHardwares < ActiveRecord::Migration[5.2]
  def change
    add_column :endpoint_hardwares, :user_cert_date, :string
    add_column :endpoint_hardwares, :user_cert_sum, :string
    add_column :endpoint_hardwares, :user_key_date, :string
    add_column :endpoint_hardwares, :user_key_sum, :string
  end
end
