class AddCertInfoToEndpointStatus < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoint_statuses, :wifi_cert_status, :string
  end
end
