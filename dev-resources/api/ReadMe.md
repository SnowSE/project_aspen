# Working with a local development database

> Note that all the commands in this file should be run from this same directory (the dev-resources/api directory)

## Create your local database

```bash
docker compose up -d
```

## Delete old database so you can start from scratch with the most recent database dump

```bash
docker compose down
docker volume rm api_localdev_api_db
```

## To create a new database dump/snapshot

```bash
docker exec -t localdev_api_db pg_dump -c --if-exists -U aspen aspen > backup.sql
```
