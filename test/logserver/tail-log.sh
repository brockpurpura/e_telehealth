#!/bin/bash
docker-compose exec logserver tail -f /var/log/tcp
