# RubyEncoder v2.7
if !defined?(RGLoader)||!RGLoader.respond_to?(:check_version)||!RGLoader.check_version('2.7') then _d=_d0=File.expand_path(File.dirname(__FILE__)); while true do _f=_d+'/rgloader/loader.rb'; load _f and break if File.exist?(_f); _d1=File.dirname(_d); if _d1==_d then break if defined?(RGLoader); raise LoadError, "Ruby script '"+__FILE__+"' is protected by RubyEncoder and requires a RubyEncoder loader to be installed. Please visit the https://www.rubyencoder.com/loaders/ RubyEncoder web site to download the required loader and unpack it into '"+_d0+"/rgloader/' directory in order to run this protected file."; exit; else _d=_d1; end; end; end; RGLoader_load('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');