class CreateSidekiqJobsByChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :sidekiq_jobs_by_channels do |t|
      t.integer :client_admin_id
      t.string :job_name
      t.integer :is_running, :default => 0
      t.timestamps
    end

    add_index :sidekiq_jobs_by_channels, [:client_admin_id , :job_name] 
  end
end
