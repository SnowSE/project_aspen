# project_aspen
Project Aspen
To start the project on a new computer start docker, then navigate to “../project_aspen/src/aspen” then run
docker-compose up --build 
and then the web server should be running on http://localhost:3000/


### Running this with docker-compose
Run docker-compose up --build

### Running this stand-alone
- Start the database
  - `cd src/aspen/aspen.api`
  - If you're on windows: `./startDevDb.cmd` 
  - If not: `./startDvDb.sh`
- Start the api
  - `dotnet run`
- Start the front end
  - `cd ../aspen.web`
  - `./start-standalone.ps1`