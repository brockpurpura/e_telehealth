require 'test_helper'

class ApplicationHelperTest < ActionView::TestCase
    test "should convert e164 phone number" do
        result = e164_to_uhe("+12154333248")
        assert_equal("2154333248", result[:number])
        assert_equal("us", result[:country])

        assert_raise(Exception) {
            result = e164_to_uhe("+19876748693")
        }

        result = e164_to_uhe("+447988734672")
        assert_equal("7988734672", result[:number])
        assert_equal("gb", result[:country])

        result = e164_to_uhe("+1(215)433-32-48")
        assert_equal("2154333248", result[:number])
        assert_equal("us", result[:country])

        result = e164_to_uhe("+3598 987 65674")
        assert_equal("898765674", result[:number])
        assert_equal("bg", result[:country])
    end

    test "Should convert UHE phone number and country code to e164" do 
        result = uhe_to_e164("2154333248", "us")
        assert_equal("+12154333248", result)

        result = uhe_to_e164("+12154333248", "us")
        assert_equal("+12154333248", result)

        result = uhe_to_e164("2154333248")
        assert_equal("+12154333248", result)

        result = uhe_to_e164("7988734672", "gb")
        assert_equal("+447988734672", result)

        result = uhe_to_e164("2154333248", "us")
        assert_equal("+12154333248", result)

        result = uhe_to_e164("(215)433-3248", "us")
        assert_equal("+12154333248", result)

        assert_raise(Exception) { 
            result = uhe_to_e164("sdgtrwrth65", "us")
        }

    end
end