# This class can be used to test the system keypair used in generating JWT tokens
# Usage: <from the telehealth directory>
# ruby lib/keytest.rb

require 'openssl'

class Keytest
    begin 
        public_key = OpenSSL::PKey::RSA.new(File.read("../api_public.pub"))
        private_key = OpenSSL::PKey::RSA.new(File.read("../api_private.pem"))
        puts "\xE2\x9C\x94 Loaded Keys"

        public_encrypt = public_key.public_encrypt("hello world!")
        puts "\xE2\x9C\x94 Encrypted text using Public Key"
        
        raise "Invalid Public Key" if !public_key.public?
        puts "\xE2\x9C\x94 Checked the Public key file contains a Public Key"

        private_encrypt = private_key.private_encrypt("Hello Sunshine!")
        puts "\xE2\x9C\x94 Encrypted text using Private Key"

        private_key.private_decrypt(public_encrypt)
        puts "\xE2\x9C\x94 Decrypted text encrypted with Public Key, using Private Key"

        raise "Invalid Private Key" if !private_key.private?
        puts "\xE2\x9C\x94 Checked the Private Key file contains a Private Key"

        puts "\xE2\x9C\x94 Keys appear valid"
    rescue StandardError => ex
        puts "ERROR WITH JWT KEYS: #{ex}"
    end
end