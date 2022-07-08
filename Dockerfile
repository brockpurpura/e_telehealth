# Passenger version 5.1.4
FROM phusion/passenger-ruby23:0.9.21

# Use baseimage-docker's init process
CMD ["/sbin/my_init"]

# Update the operating system
#RUN apt-get update -qq && apt-get upgrade -y -o Dpkg::Options::="--force-confold"

# Install OS packages needed to build the app dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs libmagickwand-dev libmagick-dev pkg-config libzbar-dev

# Clean up APT
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Do not run these services bundled into the phusion base image
RUN rm -rf /etc/service/sshd/ /etc/service/syslog-forwarder/ /etc/service/syslog-ng/

# Enable nginx and passenger
RUN rm -f /etc/service/nginx/down

# Configure nginx + passenger
RUN rm /etc/nginx/sites-enabled/default
COPY config/nginx/devserver/nginx.conf /etc/nginx/
COPY config/nginx/devserver/telehealth.conf /etc/nginx/sites-enabled/
COPY config/nginx/devserver/telehealth-env.conf /etc/nginx/main.d/
RUN mkdir /certs/
COPY config/nginx/devserver/univagohealthcare.* /certs/

# Expose nginx ports
EXPOSE 80 443 8443

# Deploy rails application
RUN mkdir /telehealth
COPY Gemfile Gemfile.lock /telehealth/
WORKDIR /telehealth
RUN gem install bundler -v 1.17.3
RUN bundle install
ADD . /telehealth
RUN chown -R app:app /telehealth

