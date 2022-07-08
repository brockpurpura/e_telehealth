# frozen_string_literals: true

class SameSiteCookies

  def initialize(app)
    @app = app
  end

  def call(env)
    status, headers, body = @app.call(env)

    if env["PATH_INFO"] == '/home/conference' or env["PATH_INFO"] == '/observation' or env["PATH_INFO"] == '/api/meeting' or env["PATH_INFO"] == '/api/encrypted_call' or env["PATH_INFO"] == '/clinician_sso' or env["PATH_INFO"] == '/iobserver_sso' 

      set_cookie_header = headers['Set-Cookie']
  
      if set_cookie_header && !(set_cookie_header =~ /SameSite\=/)
        # the set cookie header variable is frozen
        new_set_cookie_header = set_cookie_header.dup
        new_set_cookie_header << ';' if !(set_cookie_header =~ /;$/)
        new_set_cookie_header << ' SameSite=None'
        new_set_cookie_header << '; Secure' if is_ssl?

        headers['Set-Cookie'] = new_set_cookie_header

      end
    end

    [status, headers, body]
  end

  private

  def is_ssl?
    return true 
  end
end

#SameSite None and Secure for iframe rendering in Chrome
Rails.application.config.middleware.insert_before(ActionDispatch::Cookies, SameSiteCookies)

