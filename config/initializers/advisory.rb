require 'active_record/connection_adapters/abstract_mysql_adapter'
ActiveRecord::ConnectionAdapters::AbstractMysqlAdapter.class_eval do
  def supports_advisory_locks?
    return false if ActiveRecord::Base.connection.execute("SELECT @@SESSION.sql_mode;").first.first.split(",").include?("STRICT_TRANS_TABLES")
    true
  end
end
