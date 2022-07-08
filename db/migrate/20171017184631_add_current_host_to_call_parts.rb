class AddCurrentHostToCallParts < ActiveRecord::Migration[5.1]
  def change
    add_column :call_participants, :current_host, :integer, :default => 0
  end
end
