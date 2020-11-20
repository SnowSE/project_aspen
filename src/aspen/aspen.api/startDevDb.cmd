docker rm -f aspen_dev_db
docker run --name aspen_dev_db ^
  -p 5432:5432 ^
  -d ^
  -e POSTGRES_USER=Aspen ^
  -e POSTGRES_PASSWORD=Aspen ^
  -e POSTGRES_DB=admin ^
  postgres postgres -c log_statement=all
