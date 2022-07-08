class AddLdapRolesToApiKeys < ActiveRecord::Migration[5.1]
  def change
    add_column :api_keys, :ldap_admin_group, :string
    add_column :api_keys, :ldap_clinician_group, :string
    add_column :api_keys, :ldap_observer_group, :string
    add_column :api_keys, :ldap_technician_group, :string
    add_column :api_keys, :ldap_readonly_group, :string
    add_column :client_admin_api_keys, :ldap_admin_group, :string
  end
end
