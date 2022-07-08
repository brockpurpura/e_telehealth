# RubyEncoder v2.7
if !defined?(RGLoader)||!RGLoader.respond_to?(:check_version)||!RGLoader.check_version('2.7') then _d=_d0=File.expand_path(File.dirname(__FILE__)); while true do _f=_d+'/rgloader/loader.rb'; load _f and break if File.exist?(_f); _d1=File.dirname(_d); if _d1==_d then break if defined?(RGLoader); raise LoadError, "Ruby script '"+__FILE__+"' is protected by RubyEncoder and requires a RubyEncoder loader to be installed. Please visit the https://www.rubyencoder.com/loaders/ RubyEncoder web site to download the required loader and unpack it into '"+_d0+"/rgloader/' directory in order to run this protected file."; exit; else _d=_d1; end; end; end; RGLoader_load('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');
