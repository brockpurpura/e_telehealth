class VmrMonitor < Struct.new(:desc)

   include PexipApi

   def perform
     @vmrs_to_create = Configurable.vmr_on_deck_amount - Vmr.on_deck_list.count
     for i in (@vmrs_to_create).downto(1) 
       create_vmr 
     end
     ## reinsert ourselves
     Delayed::Job.enqueue(::VmrMonitor.new('run vmr'), :run_at =>10.minutes.from_now) 

   end

   def max_attempts
     return 3 
   end

end

