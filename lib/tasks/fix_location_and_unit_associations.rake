namespace :db do
    desc 'INC:512 - incorrect assication of Location and Unit'
    task :fix_associations => :environment do
        begin 
            count = 0
            Admin.where("is_mobile_user = 1 and mobile_location_id is not null").each do |mob_user|
                
                if mob_user.mobile_location.present?
                    client_id = mob_user.client_id
                    mobile_location_client_id = mob_user.mobile_location.client.id # Building => Location.client_id

                    if client_id != mobile_location_client_id 
                        puts "INVALID USER #{mob_user.email}, client id: #{mob_user.client_id}, Loc client id: #{mobile_location_client_id}"
                        count = count + 1
                    end
                else 
                    #puts "Could not find Location with ID #{mob_user.mobile_location_id}"
                end
                
            end
            puts "Found #{count} invalid users"

        rescue StandardError => err
            puts "FATAL ERROR: #{err}"
        end
    end
end
