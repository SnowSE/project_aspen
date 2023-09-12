## User Permissions and Roles 3/13/2023

[Authorize] = registered user

AdminController 
- [Authorize(Roles = AspenAdminRole)]

AssetController
- [Authorize]

DonationController
- Open to all

EventController
- Add - [Authorize(Roles = AspenAdminRole)]
- Put - [Authorize(Roles = AspenAdminRole)]
- Delete - [Authorize(Roles = AspenAdminRole)]
- Get - Open to all

LinkController
- Open to all

LinkRecordController
- Open to all

PersonController
- get{id} - [Authorize]*
- get{authId} -[Authorize]*
- add - open to all
- put - [Authorize]*
- delete - Authorize(Roles = AdminController.AspenAdminRole)

PersonTeamAssociationController
- [Authorize]*

StripeController
- failures - [Authorize(Roles = AspenAdminRole)]*
- webhook - open to all
- post - open to all
- success - open to all

TeamController
- Get("event/{eventId}) - open to all
- Get("{teamId}") open to all
- Add - [Authorize]*
- Put("{teamId}") - [Authorize]* & Team Owner
- Delete("{id}") - [Authorize(Roles = AspenAdminRole)