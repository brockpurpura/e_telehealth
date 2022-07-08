class AddInvitedToParticipants < ActiveRecord::Migration[5.1]
  def change
    add_column :call_participants, :invited, :integer, :default => 0
    add_column :call_participants, :api, :integer, :default => 0
    change_column :users, :api_unique, :string
  end
end
