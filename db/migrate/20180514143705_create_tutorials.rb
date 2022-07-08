class CreateTutorials < ActiveRecord::Migration[5.1]
  def change
    create_table :tutorials do |t|

      t.string :youtube_path
      t.string :video_description

      t.timestamps
    end
  end
end
