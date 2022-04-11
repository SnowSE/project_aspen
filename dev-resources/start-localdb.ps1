# must be run from the dev-resources directory
# assumes port 5432 will be open
docker run --restart unless-stopped -p 5432:5432 -v "$((get-location).Path.Replace('\','/'))/api/backup.sql:/docker-entrypoint-initdb.d/backup.sql" -e POSTGRES_PASSWORD=password --name aspen_api_db -d postgres