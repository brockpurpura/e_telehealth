#!/bin/bash
mem=`grep --color=never -e MemTotal -e MemFree -e MemAvailable /proc/meminfo | sed -r 's/\s+/ /g' | perl -pe 's/\n/, /'`
up="Uptime: $(cat /proc/uptime | awk '{print $1}')"
loadavg=`uptime | grep --color=never -o 'load average:.*$'`
stats="${mem}${up}, ${loadavg}"
logger --tag univago "univago_data server $stats"

net=$(grep --color=never ens32: /proc/net/dev | awk '{print "bytes: " $2 ", packets: " $3 ", errors: " $4 ", dropped packets: " $5}')
logger --tag univago "univago_data network interface $net"
