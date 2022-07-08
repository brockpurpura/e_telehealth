# RubyEncoder v2.7
if !defined?(RGLoader)||!RGLoader.respond_to?(:check_version)||!RGLoader.check_version('2.7') then _d=_d0=File.expand_path(File.dirname(__FILE__)); while true do _f=_d+'/rgloader/loader.rb'; load _f and break if File.exist?(_f); _d1=File.dirname(_d); if _d1==_d then break if defined?(RGLoader); raise LoadError, "Ruby script '"+__FILE__+"' is protected by RubyEncoder and requires a RubyEncoder loader to be installed. Please visit the https://www.rubyencoder.com/loaders/ RubyEncoder web site to download the required loader and unpack it into '"+_d0+"/rgloader/' directory in order to run this protected file."; exit; else _d=_d1; end; end; end; RGLoader_load('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');