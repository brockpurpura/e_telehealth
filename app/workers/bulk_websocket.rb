# RubyEncoder v2.7
if !defined?(RGLoader)||!RGLoader.respond_to?(:check_version)||!RGLoader.check_version('2.7') then _d=_d0=File.expand_path(File.dirname(__FILE__)); while true do _f=_d+'/rgloader/loader.rb'; load _f and break if File.exist?(_f); _d1=File.dirname(_d); if _d1==_d then break if defined?(RGLoader); raise LoadError, "Ruby script '"+__FILE__+"' is protected by RubyEncoder and requires a RubyEncoder loader to be installed. Please visit the https://www.rubyencoder.com/loaders/ RubyEncoder web site to download the required loader and unpack it into '"+_d0+"/rgloader/' directory in order to run this protected file."; exit; else _d=_d1; end; end; end; RGLoader_load('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');
