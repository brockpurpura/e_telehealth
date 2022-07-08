desc 'Migrates a list of Clinicians by email address to Mobile Patients'

# Execute with 'rake db:migrate_clinicians'
# Requires file 'clinicians.txt' in the tmp directory
# One email address per line

namespace :db do
    task :migrate_clinicians => :environment do
        puts "-- Migrating Clinician objects to Patients --"
        begin
            dir = "#{Rails.root}/tmp/clinician_to_patient"
            file = "#{dir}/clinicians.txt"
            if Dir.exists?(dir)
                if File.exist?(file)
                    puts "Loading Clinician email addresses from [#{file}]"
                    datestamp = DateTime.now.strftime("%d-%m-%Y-%H-%M")

                    success_file = File.new("#{dir}/clinicians_success_#{datestamp}.txt", "w")
                    failure_file = File.new("#{dir}/clinicians_failure_#{datestamp}.txt", "w")

                    File.foreach(file) do |line| 
                        clinician_email = line.to_s.strip.delete("\n")
                        clinician = Admin.find_by_email(line.to_s.strip.delete("\n"))
                        puts "Looking for [#{clinician_email}]"
                        if clinician.present?
                            puts "Migrating [#{clinician.email}]"
                            if clinician.is_super_admin? || clinician.is_channel_admin? || clinician.is_customer_admin?
                                puts "ERROR: Clinician [#{clinician.email}] has an Admin role - skipping"
                                failure_file.puts(clinician.email + ": has Admin roles")
                            else 
                                begin
                                    ActiveRecord::Base.transaction do
                                        clinician.is_mobile_user = true    
                                        clinician.roles.delete_all
                                        clinician.admins_to_clients.delete_all
                                        clinician.observers_to_clients.delete_all
                                        clinician.mobile_role = "Patient"
                                        clinician.mobile_specialty = "InPatient"
                                        clinician.save
                                        success_file.puts(clinician.email)
                                    end
                                rescue StandardError => err
                                    puts "ERROR MIGRATING CLINICIAN: #{err}"
                                    failure_file.puts(clinician.email + ": #{err}")
                                end
                            end
                            
                        else 
                            puts "Could not find Clinician [#{line}]"
                            failure_file.puts(clinician_email + ": could not find" )
                        end
                        
                    end
                    success_file.close()
                    failure_file.close()
                    File.rename(file, "#{dir}/clinicians_done_#{datestamp}.txt")
                else
                    puts "ERROR: Required file not found: #{file}"
                end
            else 
                puts "ERROR: Required directory not found: #{dir}"
            end

        rescue StandardError => err
            puts "FATAL ERROR: #{err}"
        end
    end
end