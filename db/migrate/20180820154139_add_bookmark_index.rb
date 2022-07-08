class AddBookmarkIndex < ActiveRecord::Migration[5.1]
  def change
    add_index :bookmarks, :name
    add_index :bookmarks, [:endpoint_id, :user_id]
  end
end
