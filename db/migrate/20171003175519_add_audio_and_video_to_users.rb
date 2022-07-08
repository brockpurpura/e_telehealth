class AddAudioAndVideoToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :d_audio, :string
    add_column :users, :d_video, :string
  end
end
