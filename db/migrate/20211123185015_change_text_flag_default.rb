class ChangeTextFlagDefault < ActiveRecord::Migration[5.2]
  def change
    change_column_default :users, :text_flag, 0
  end
end
