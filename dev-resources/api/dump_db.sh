docker exec -t localdev_api_db pg_dump -c --if-exists -U aspen aspen > backup.sql
