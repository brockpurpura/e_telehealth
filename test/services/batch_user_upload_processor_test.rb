require 'test_helper'

class BatchUserUploadProcessorTest < ActiveSupport::TestCase

    @@cuj = CreateUserJob.new

    def setup
        FileUtils.mkdir_p Rails.root.join('tmp', 'bulk_uploads')
        FileUtils.cp Rails.root.join('test', 'fixtures', 'files', 'bryan_health.csv'), Rails.root.join('tmp', 'bulk_uploads', 'bryan_health.csv')
    end
  
    test 'check that the CSV importer creates a valid data object for the row' do
        #test_batch = Batch.find(3)
        #BatchUserUploadProcessor.call(test_batch)
        #row1 = JSON.parse(test_batch.batch_rows[1].data)
        #assert_equal "CareConnect 2", row1["first_name"]
        #assert_equal "Bryan Health", row1["last_name"]
        #assert_equal "Covid Tech Connect", row1["channel"]
        #assert_equal "CTC - Bryan Health", row1["customer"]
        #assert_equal "CTC - Bryan Health", row1["location"]
        #assert_equal "CTC - Bryan Health", row1["unit"]
        #assert_equal "Inpatient", row1["speciality"]
        #assert_equal "careconnect2@BRYANHEAffLTH.com", row1["email"]
        #assert_equal "Welcome1!", row1["password"]

        #row4 = JSON.parse(test_batch.batch_rows[3].data)
        #assert_equal "CareConnect 4", row4["first_name"]
        #assert_equal "Bryan Health", row4["last_name"]
        #assert_equal "Covid Tech Connect", row4["channel"]
        #assert_equal "CTC - Bryan Health", row4["customer"]
        #assert_equal "CTC - Bryan Health", row4["location"]
        #assert_equal "CTC - Bryan Health", row4["unit"]
        #assert_equal "Inpatient", row4["speciality"]
        #assert_equal "careconnect4@BRYANHEAffLTH.com", row4["email"]
        #assert_equal "Welcome1!", row4["password"]

    end
end