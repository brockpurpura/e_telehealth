require 'test_helper'

class AdminSerializerTest < ActiveSupport::TestCase

    test 'Serialized Admin model returns correct value for notification_portal_access: attribute is false' do
        @admin = Admin.find(3)
        @serializer_instance = AdminSerializer.new(@admin)
        @expected_hash = {
            :id=>3, 
            :email=>"patient1@caregility.com", 
            :first_name=>nil, 
            :last_name=>nil, 
            :phone_number=>nil, 
            :channel=>"System Testing Channel", 
            :channel_id=>1, 
            :customer=>"Second Testing Customer", 
            :customer_id=>2, 
            :location=>nil, :location_id=>nil, 
            :unit=>nil, 
            :unit_id=>nil, 
            :is_super_admin=>false, 
            :is_channel_admin=>false, 
            :is_customer_admin=>false, 
            :belongs_to_customer_with_patients=>true, 
            :is_vicn=>false, 
            :is_clinician=>false, 
            :is_patient=>true, 
            :mobile_role=>"Patient", 
            :mobile_specialty=>"InPatient", 
            :has_notification_portal_role=>false, 
            :has_iobserver_role=>false, 
            :notification_portal_enabled=>false,
            :interpreter_enabled=>false,
            :guest_button_enabled=>true}
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end

    test 'Serialized Admin model returns correct value for notification_portal_access: attribute is true' do
        @admin = Admin.find(4)
        @serializer_instance = AdminSerializer.new(@admin)
        @expected_hash = {
            :id=>4, 
            :email=>"patient2@caregility.com", 
            :first_name=>nil, 
            :last_name=>nil, 
            :phone_number=>nil, 
            :channel=>"System Testing Channel", 
            :channel_id=>1, 
            :customer=>"Third Testing Customer", 
            :customer_id=>3, 
            :location=>nil, :location_id=>nil, 
            :unit=>nil, 
            :unit_id=>nil, 
            :is_super_admin=>false, 
            :is_channel_admin=>false, 
            :is_customer_admin=>false, 
            :belongs_to_customer_with_patients=>true, 
            :is_vicn=>false, 
            :is_clinician=>false, 
            :is_patient=>true, 
            :mobile_role=>"Patient", 
            :mobile_specialty=>"InPatient", 
            :has_notification_portal_role=>false, 
            :has_iobserver_role=>false, 
            :notification_portal_enabled=>true,
            :interpreter_enabled=>false,
            :guest_button_enabled=>true}
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end

    test 'Serialized Admin model returns correct value for notification_portal_access: attribute is nil' do
        @admin = Admin.find(5)
        @serializer_instance = AdminSerializer.new(@admin)
        @expected_hash = {
            :id=>5, 
            :email=>"patient3@caregility.com", 
            :first_name=>nil, 
            :last_name=>nil, 
            :phone_number=>nil, 
            :channel=>"System Testing Channel", 
            :channel_id=>1, 
            :customer=>"Fourth Testing Customer", 
            :customer_id=>4, 
            :location=>nil, :location_id=>nil, 
            :unit=>nil, 
            :unit_id=>nil, 
            :is_super_admin=>false, 
            :is_channel_admin=>false, 
            :is_customer_admin=>false, 
            :belongs_to_customer_with_patients=>true, 
            :is_vicn=>false, 
            :is_clinician=>false, 
            :is_patient=>true, 
            :mobile_role=>"Patient", 
            :mobile_specialty=>"InPatient", 
            :has_notification_portal_role=>false, 
            :has_iobserver_role=>false, 
            :notification_portal_enabled=>true,
            :interpreter_enabled=>false,
            :guest_button_enabled=>true}
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end

    test 'Serialized Admin model returns correct value for notification_portal_access: attribute is random' do
        @admin = Admin.find(6)
        @serializer_instance = AdminSerializer.new(@admin)
        @expected_hash = {
            :id=>6, 
            :email=>"patient4@caregility.com", 
            :first_name=>nil, 
            :last_name=>nil, 
            :phone_number=>nil, 
            :channel=>"System Testing Channel", 
            :channel_id=>1, 
            :customer=>"Fifth Testing Customer", 
            :customer_id=>5, 
            :location=>nil, :location_id=>nil, 
            :unit=>nil, 
            :unit_id=>nil, 
            :is_super_admin=>false, 
            :is_channel_admin=>false, 
            :is_customer_admin=>false, 
            :belongs_to_customer_with_patients=>true, 
            :is_vicn=>false, 
            :is_clinician=>false, 
            :is_patient=>true, 
            :mobile_role=>"Patient", 
            :mobile_specialty=>"InPatient", 
            :has_notification_portal_role=>false, 
            :has_iobserver_role=>false, 
            :notification_portal_enabled=>false,
            :interpreter_enabled=>false,
            :guest_button_enabled=>true}
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end

    test 'Serialized Admin model returns correct value for belongs_to_customer_with_patients' do
        @admin = Admin.find(12)
        @serializer_instance = AdminSerializer.new(@admin)
        @expected_hash = {
            :id=>12, 
            :email=>"clinician_7@caregility.com", 
            :first_name=>nil, 
            :last_name=>nil, 
            :phone_number=>nil, 
            :channel=>"Second System Testing Channel", 
            :channel_id=>2, 
            :customer=>"Seventh Testing Customer", 
            :customer_id=>7, 
            :location=>nil, 
            :location_id=>nil, 
            :unit=>nil, 
            :unit_id=>nil, 
            :is_super_admin=>false, 
            :is_channel_admin=>false, 
            :is_customer_admin=>false, 
            :belongs_to_customer_with_patients=>true, 
            :is_vicn=>false, 
            :is_clinician=>false, 
            :is_patient=>false, 
            :mobile_role=>nil, 
            :mobile_specialty=>nil, 
            :has_notification_portal_role=>false, 
            :has_iobserver_role=>false, 
            :notification_portal_enabled=>false,
            :interpreter_enabled=>false,
            :guest_button_enabled=>false}
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end

    test 'Non-admin Clinician returns correct Customer and Channel Name' do
        @admin = Admin.find(7)
        @serializer_instance = AdminSerializer.new(@admin)
        @expected_hash = {
            :id=>7, 
            :email=>"non-admin-clinician@caregility.com", 
            :first_name=>nil, 
            :last_name=>nil, 
            :phone_number=>nil, 
            :channel=>"System Testing Channel", 
            :channel_id=>1, 
            :customer=>"Second Testing Customer", 
            :customer_id=>2, 
            :location=>nil, :location_id=>nil, 
            :unit=>nil, 
            :unit_id=>nil, 
            :is_super_admin=>false, 
            :is_channel_admin=>false, 
            :is_customer_admin=>false, 
            :belongs_to_customer_with_patients=>true, 
            :is_vicn=>false, 
            :is_clinician=>false, 
            :is_patient=>false, 
            :mobile_role=>nil, 
            :mobile_specialty=>nil, 
            :has_notification_portal_role=>false, 
            :has_iobserver_role=>false, 
            :notification_portal_enabled=>false,
            :interpreter_enabled=>false,
            :guest_button_enabled=>false}
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end

    test 'Super Admin Clinician returns correct Customer and Channel Name' do
        @admin = Admin.find(8)
        @serializer_instance = AdminSerializer.new(@admin)
        @expected_hash = {
            :id=>8, 
            :email=>"super-admin-clinician@caregility.com", 
            :first_name=>nil, 
            :last_name=>nil, 
            :phone_number=>nil, 
            :channel=>"All Channels", 
            :channel_id=>0, 
            :customer=>"All Customers", 
            :customer_id=>0, 
            :location=>nil, 
            :location_id=>nil, 
            :unit=>nil, 
            :unit_id=>nil, 
            :is_super_admin=>true,
            :is_channel_admin=>false, 
            :is_customer_admin=>false, 
            :belongs_to_customer_with_patients=>true, 
            :is_vicn=>false, 
            :is_clinician=>true, 
            :is_patient=>false, 
            :mobile_role=>nil, 
            :mobile_specialty=>nil, 
            :has_notification_portal_role=>false, 
            :has_iobserver_role=>false, 
            :notification_portal_enabled=>true,
            :interpreter_enabled=>false,
            :guest_button_enabled=>false}
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end

    # Channel Admin clinician
    test 'Channel Admin Clinician returns correct Customer and Channel Name' do
        @admin = Admin.find(9)
        @serializer_instance = AdminSerializer.new(@admin)
        @expected_hash = {
            :id=>9, 
            :email=>"channel-admin-clinician@caregility.com", 
            :first_name=>nil, 
            :last_name=>nil, 
            :phone_number=>nil, 
            :channel=>"System Testing Channel", 
            :channel_id=>1, 
            :customer=>"All Customers", 
            :customer_id=>0, 
            :location=>nil, 
            :location_id=>nil, 
            :unit=>nil, 
            :unit_id=>nil, 
            :is_super_admin=>false,
            :is_channel_admin=>true, 
            :is_customer_admin=>false, 
            :belongs_to_customer_with_patients=>true, 
            :is_vicn=>false, 
            :is_clinician=>true, 
            :is_patient=>false, 
            :mobile_role=>nil, 
            :mobile_specialty=>nil, 
            :has_notification_portal_role=>false, 
            :has_iobserver_role=>false, 
            :notification_portal_enabled=>true,
            :interpreter_enabled=>false,
            :guest_button_enabled=>false}
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end


    # Customer Admin Clinician  
    test 'Customer Admin Clinician returns correct Customer and Channel Name' do
        @admin = Admin.find(10)
        @serializer_instance = AdminSerializer.new(@admin)
        @expected_hash = {
            :id=>10, 
            :email=>"customer-admin-clinician@caregility.com", 
            :first_name=>nil, 
            :last_name=>nil, 
            :phone_number=>nil, 
            :channel=>"System Testing Channel", 
            :channel_id=>1, 
            :customer=>"Second Testing Customer", 
            :customer_id=>2, 
            :location=>nil, 
            :location_id=>nil, 
            :unit=>nil, 
            :unit_id=>nil, 
            :is_super_admin=>false,
            :is_channel_admin=>false, 
            :is_customer_admin=>true, 
            :belongs_to_customer_with_patients=>true, 
            :is_vicn=>false, 
            :is_clinician=>true, 
            :is_patient=>false, 
            :mobile_role=>nil, 
            :mobile_specialty=>nil, 
            :has_notification_portal_role=>false, 
            :has_iobserver_role=>false, 
            :notification_portal_enabled=>false,
            :interpreter_enabled=>false,
            :guest_button_enabled=>false}
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end

    # Patient
    test 'Patient returns correct Customer and Channel Name' do
        @admin = Admin.find(11)
        @serializer_instance = AdminSerializer.new(@admin)
        @expected_hash = {
            :id=>11, 
            :email=>"patient@caregility.com", 
            :first_name=>nil, 
            :last_name=>nil, 
            :phone_number=>nil, 
            :channel=>"System Testing Channel", 
            :channel_id=>1, 
            :customer=>"Second Testing Customer", 
            :customer_id=>2, 
            :location=>"Staging Location", 
            :location_id=>1, 
            :unit=>"Eatontown", 
            :unit_id=>1, 
            :is_super_admin=>false,
            :is_channel_admin=>false, 
            :is_customer_admin=>false, 
            :belongs_to_customer_with_patients=>true, 
            :is_vicn=>false, 
            :is_clinician=>false, 
            :is_patient=>true, 
            :mobile_role=>"Patient", 
            :mobile_specialty=>"InPatient", 
            :has_notification_portal_role=>false, 
            :has_iobserver_role=>false, 
            :notification_portal_enabled=>false,
            :interpreter_enabled=>false,
            :guest_button_enabled=>true}
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end

    # Customer Admin Clinician  
    test 'Clinician with null Client ID' do
        @admin = Admin.find(14)
        @serializer_instance = AdminSerializer.new(@admin)
        @expected_hash = {
            :id=>14, 
            :email=>"clinician_8@caregility.com", 
            :first_name=>nil, 
            :last_name=>nil, 
            :phone_number=>nil, 
            :channel=>"Unknown Channel", 
            :channel_id=>"Unknown Channel ID", 
            :customer=>"Unknown Customer", 
            :customer_id=>"Unknown Customer ID", 
            :location=>nil, 
            :location_id=>nil, 
            :unit=>nil, 
            :unit_id=>nil, 
            :is_super_admin=>false,
            :is_channel_admin=>false, 
            :is_customer_admin=>false, 
            :belongs_to_customer_with_patients=>false, 
            :is_vicn=>false, 
            :is_clinician=>true, 
            :is_patient=>false, 
            :mobile_role=>nil, 
            :mobile_specialty=>nil, 
            :has_notification_portal_role=>false, 
            :has_iobserver_role=>false, 
            :notification_portal_enabled=>false,
            :interpreter_enabled=>false,
            :guest_button_enabled=>false}
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end

    test 'Clinician with null Client ID but Channel ID' do
        @admin = Admin.find(15)
        @serializer_instance = AdminSerializer.new(@admin)
        @expected_hash = {
            :id=>15, 
            :email=>"clinician_9@caregility.com", 
            :first_name=>nil, 
            :last_name=>nil, 
            :phone_number=>nil, 
            :channel=>"System Testing Channel", 
            :channel_id=>1, 
            :customer=>"All Customers", 
            :customer_id=>0, 
            :location=>nil, 
            :location_id=>nil, 
            :unit=>nil, 
            :unit_id=>nil, 
            :is_super_admin=>false,
            :is_channel_admin=>false, 
            :is_customer_admin=>false, 
            :belongs_to_customer_with_patients=>true, 
            :is_vicn=>false, 
            :is_clinician=>false, 
            :is_patient=>false, 
            :mobile_role=>nil, 
            :mobile_specialty=>nil, 
            :has_notification_portal_role=>false, 
            :has_iobserver_role=>false, 
            :notification_portal_enabled=>false,
            :interpreter_enabled=>false,
            :guest_button_enabled=>false}
        assert_equal @expected_hash, @serializer_instance.serializable_hash
    end
end  