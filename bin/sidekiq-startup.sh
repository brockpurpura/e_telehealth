#!/bin/bash
cd "$(dirname $0)/.."
bundle exec sidekiq -d -L log/sidekiq.log -C config/sidekiq.yml -e production
