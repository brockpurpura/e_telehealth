class AddSupportSectionToSupport < ActiveRecord::Migration[5.1]
  def change
    add_column :supports, :support_section_id, :integer
  end
end
