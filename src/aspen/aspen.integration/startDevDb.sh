#!/bin/bash
# docker exec -it gnome_warfare_dev_db psql -U Gnome

background=''

while getopts "d" OPTION; do
  case "$OPTION" in
    d) background='-d' ;;
  esac
done

docker rm -f aspen_dev_db;
docker run --name aspen_dev_db $background \
  -p 5433:5432 \
  -e POSTGRES_USER=Aspen \
  -e POSTGRES_PASSWORD=Aspen \
  -e POSTGRES_DB=admin \
  postgres postgres -c log_statement=all
