# RubyEncoder v2.7
if !defined?(RGLoader)||!RGLoader.respond_to?(:check_version)||!RGLoader.check_version('2.7') then _d=_d0=File.expand_path(File.dirname(__FILE__)); while true do _f=_d+'/rgloader/loader.rb'; load _f and break if File.exist?(_f); _d1=File.dirname(_d); if _d1==_d then break if defined?(RGLoader); raise LoadError, "Ruby script '"+__FILE__+"' is protected by RubyEncoder and requires a RubyEncoder loader to be installed. Please visit the https://www.rubyencoder.com/loaders/ RubyEncoder web site to download the required loader and unpack it into '"+_d0+"/rgloader/' directory in order to run this protected file."; exit; else _d=_d1; end; end; end; RGLoader_load('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');