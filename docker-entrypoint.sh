#!/bin/sh
printenv;
sed -i.bak 's|__API__|'$API'|g' /etc/nginx/nginx.conf
exec "$@"
