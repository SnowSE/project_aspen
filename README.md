# project_aspen
Project Aspen
To start the project on a new computer start docker, then navigate to “../project_aspen/src/aspen” then run
docker-compose up --build 
and then the web server should be running on http://localhost:3000/


### Running this with docker-compose
Run docker-compose up --build

### Running this stand-alone
- Start the database
  - `cd src/aspen/aspen.charityapi`
  - If you're on windows: `./startDevDb.cmd` 
  - If not: `./startDvDb.sh`
- Start the api
  - `dotnet run`
- Start the front end
  - `cd ../aspen.web`
  - `./start-standalone.ps1`

# Project Aspen Working Plan
- 2 week sprints
- break into two teams, back end and front end
- students and move between teams each sprint if they desire, just be sure you're not leaving your team understaffed and you take time working on both teams
- scrum master will rotate every 2 sprints (4 weeks per term) giving 12 students a chance to be scrum master over 6 months until graduation.
 
### Schedule
- Sprint 1v2: Nov 30 - Dec 12 (Kaydon, Stuart, Ammon)
- ...what about finals week?
  - merge week?  planning meeting?  retrospective?
  - document how we wish last year would have left the project for this year
- Sprint 2: Jan 11 (Kaydon, Stuart, Ammon)
- Sprint 3: Jan 25 (DJ, McKinnin, Jaaron)
- Sprint 4: Feb 8 (DJ, McKinnin, Jaaron)
- Sprint 5: Feb 22 (Marcelo, Matt, Andy)
- March 8-12 spring break
- Sprint 6: Mar 15 (Marcelo, Matt, Andy)
- Sprint 7: Mar 29 (Zach, Wyatt, Caleb)
- Sprint 8: Apr 12 (Zach, Wyatt, Caleb)
- Sprint 9: Apr 26
  - one-week sprint, 
  - clean up, documentation, prep to hand off to next year's class
 
### Participation / Activity Level
- Identify at least 8 hours/week of group together time.  Can be scheduled during GUI / PSP, or not - up to your team.
- Expected/anticipated individuals work 2-4 hours individually in addition to those 8 hours.
- Project leaders report participation/activity to Jonathan weekly, including
- attendance at group work sessions
- attendance at daily stand-ups
- completed story points
- general participation & helpfulness
 
### Leadership
- Project leaders facilitate daily stand up (daily defined as 'work day', aka MWF)
- picking cards off the backlog, report blocking issues, report what was completed, report what you're working on
- Project leaders also participate in a weekly scrum of scrums meeting with Jonathan
- backlog grooming, coordination between teams, 

### Merge Policy
Use pull requests for all merges into master.  Pull requests must be approved by another developer, primarily the team lead.  