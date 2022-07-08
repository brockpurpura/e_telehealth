require 'test_helper'

class VmrTest < ActiveSupport::TestCase

  test "one cp" do
    vmr = Vmr.find(15782)
    assert_not vmr.has_more_then_one_host?('discount', 1)
    assert_not vmr.has_more_then_one_host?('uuid1', 1)
  end

  test "two CPs with same uid" do
    vmr = Vmr.find(15785)
    assert vmr.has_more_then_one_host?('uuid2', 2)
  end

  test "two CPs, both with -1 uid" do
    vmr = Vmr.find(15788)
    assert vmr.has_more_then_one_host?('uuid4', 1)
  end
end
