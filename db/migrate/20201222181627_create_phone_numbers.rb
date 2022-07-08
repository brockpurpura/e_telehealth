class CreatePhoneNumbers < ActiveRecord::Migration[5.1]
  def change
    create_table :phone_numbers do |t|
      t.string :name
      t.string :number
      t.string :dial_code
      t.string :flag_code
      t.string :format
  
      t.timestamps
    end
  end
end
