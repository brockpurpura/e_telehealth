#!/bin/bash
APP_DATABASE=telehealth_production
if [ $# != 1 ]
then
	echo "usage: $0 <ngrok server name>"
elif [ -z "$MYSQL_ROOT_PASSWORD" ]
then
	echo "error: must set MYSQL_ROOT_PASSWORD"
elif [ -z "$APP_DATABASE" ]
then
	echo "error: must set APP_DATABASE"
else
	docker exec -it telehealth_mysql_1 mysql -p"$MYSQL_ROOT_PASSWORD" $APP_DATABASE -e "use $APP_DATABASE; update configurables set value = '$1/cable' where name = 'server_name';"
fi

