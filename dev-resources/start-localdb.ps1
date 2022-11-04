# must be run from the dev-resources directory
# assumes port 5432 will be open

$connectionStringExists = test-path Env:\ASPEN_TEST_CONNECTION_STRING
if($connectionStringExists -eq $false) {
    [System.Environment]::SetEnvironmentVariable('ASPEN_TEST_CONNECTION_STRING','server=localhost; database=postgres; user id=postgres; password=password;',[System.EnvironmentVariableTarget]::User)
    write-host "New environment variable added to your user account."
    write-host "Make sure you either log off or at least close all your applications so the new environment variable can take effect."
}
docker run --restart unless-stopped -p 5432:5432 -v "$((get-location).Path.Replace('\','/'))/api/backup.sql:/docker-entrypoint-initdb.d/backup.sql" -e POSTGRES_PASSWORD=password --name aspen_api_db -d postgres
