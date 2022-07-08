require 'test_helper'

class CustomerTranslatorSerializerTest < ActiveSupport::TestCase

    test 'InDemand Translator' do
        @client = Client.find(1)
        @serializer_instance = CustomerTranslatorSerializer.new(@client)
        @expected_hash = {
            :customer_name=>"System Testing Customer",
            :name=>"InDemand",
            :translation_type=>"SIP",
            :marttiid=>"",
            :languages=> [
                {:name=>"Arabic",:male=>"11010010011@telehealth.indemand.us",:female=>"11010010021@telehealth.indemand.us",:any=>"11010010001@telehealth.indemand.us", :uri=>""}, 
                {:name=>"French",:male=>"11010010111@telehealth.indemand.us",:female=>"11010010121@telehealth.indemand.us",:any=>"11010010101@telehealth.indemand.us", :uri=>""}, 
                {:name=>"German",:male=>"11010010311@telehealth.indemand.us",:female=>"11010010321@telehealth.indemand.us",:any=>"11010010301@telehealth.indemand.us", :uri=>""}, 
                {:name=>"Spanish",:male=>"11010010211@telehealth.indemand.us",:female=>"11010010221@telehealth.indemand.us",:any=>"11010010201@telehealth.indemand.us", :uri=>""} 
            ]
         }
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end

    test 'Stratus Translator' do
        @client = Client.find(2)
        @serializer_instance = CustomerTranslatorSerializer.new(@client)
        @expected_hash = {
            :customer_name=>"Second Testing Customer",
            :name=>"Stratus", 
            :translation_type=>"SIP", 
            :marttiid=>"",
            :languages=>[
                {:name=>"German",:male=>"",:female=>"",:any=>"", :uri=>"7002020001@sip-test.nimbusvideo.com"}, 
                {:name=>"Karen",:male=>"",:female=>"",:any=>"", :uri=>"7002020002@sip-test.nimbusvideo.com"}, 
                {:name=>"Australian",:male=>"",:female=>"",:any=>"", :uri=>"7002020003@sip-test.nimbusvideo.com"}, 
                {:name=>"Klingon",:male=>"",:female=>"",:any=>"", :uri=>"7002020004@sip-test.nimbusvideo.com"}
            ]
        }
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end
    
    test 'LanguageLine Translator' do
        @client = Client.find(3)
        @serializer_instance = CustomerTranslatorSerializer.new(@client)
        @expected_hash = {
            :customer_name=>"Third Testing Customer",
            :name=>"LanguageLine", 
            :translation_type=>"PSTN", 
            :marttiid=>"",
            :languages=>[
                {:name=>"Australian", :male=>"", :female=>"", :any=>"", :uri=>"7002020003@sip-test.nimbusvideo.com"}, 
                {:name=>"Klingon", :male=>"", :female=>"", :any=>"", :uri=>"7002020004@sip-test.nimbusvideo.com"}
            ]
        }
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end

    test 'Cloudbreak Translator' do
        @client = Client.find(4)
        @serializer_instance = CustomerTranslatorSerializer.new(@client)
        @expected_hash = {
            :customer_name=>"Fourth Testing Customer",
            :name=>"Cloudbreak", 
            :translation_type=>"CLOUDBREAK",
            :marttiid=>"19148",
            :languages=>[
                {:name=>"German",:male=>"",:female=>"",:any=>"",:uri=>""}, 
                {:name=>"Spanish",:male=>"",:female=>"",:any=>"",:uri=>""}
            ]
        }
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end

end  