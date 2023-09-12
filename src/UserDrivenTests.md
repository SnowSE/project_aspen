## Purpose of this document is to lay procedures to test features and functionality of the application.
## This document will be updated as new features are added to the applicatio that require user testing.

### If testing can automated, it should be automated.

## Testing custom link functionality

Create a new custom link with user logged in.
### Testing should be done on the following desktop browsers: Chrome, Firefox

//Arrange 
- log out
- log in as user or admin
- navigate to page with custom link button

//Act
- Click on custom link button
- Click on copy link

//Assert
- Link should be copied to clipboard
- Link should be in the format of: https://localhost:44478/aspen/new/links/2abe26c2-428f-482d-8f04-b53b130914ec
    - <host>/aspen/new/<page on where link was created>/links/<guid>
- Link should be unique for each custom link
- Link is recorded in the database

Create a new link with user not logged in.    

//Arrange 
- log out
- navigate to page with custom link button

//Act
- Click on custom link button
- Click on copy link

//Assert
- Link should be copied to clipboard
- Link should be in the format of: https://localhost:44478/aspen/new
    - <host>/aspen/new/<page on where link was created>
- Link should not be unique
- Link is not recorded in the database