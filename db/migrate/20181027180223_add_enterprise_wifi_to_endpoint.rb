class AddEnterpriseWifiToEndpoint < ActiveRecord::Migration[5.1]
  def change
    add_column :endpoints, :enterprise_network_name, :string
    add_column :endpoints, :enterprise_username, :string
    add_column :endpoints, :enterprise_password, :string
    add_column :endpoints, :enterprise_auth, :string
    add_column :endpoints, :enterprise_inner_auth, :string
  end
end
