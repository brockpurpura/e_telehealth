class AddMediaNamesToUsersAndAdmin < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :n_audio, :string
    add_column :users, :n_video, :string
    add_column :users, :n_speaker, :string
    add_column :admins, :n_audio, :string
    add_column :admins, :n_video, :string
    add_column :admins, :n_speaker, :string
  end
end
