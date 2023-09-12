# Project Aspen - Design Notes

## Domain

- One instance of Project Aspen represents one charity.
- A charity can have multiple events.
- An event has multiple teams.
- A team has multiple registrants.
- A team may elect to have hidden registrants or public registrants.  In either case you still show the number of people on the team in the team details page.
- A registrant can have multiple people (adults, children).

## User Roles

** An individual user can have multiple roles **

- Admin
  - An administrator can create and update events, and manage page_data to customize the site.  Admin users can also manage teams.
- Sponsor
  - Sponsors can sign up on the website, give a certain amount, upload their logo.
  - Local administrators can also create sponsors and put in their images.
  - Sponsors can be per-event or annual giving partners that support the charity in general.
- Team Owner 
  - Manage team
    - Delete team members (don't require pre-approval to join)
    - set fundraising goal
    - update story / description / video
    - update name
- Participant
  - Can manage their own registration
  - Can donate / pledge
  - Can buy t-shirts, meals etc. (out of scope for 2021)
- Public unauthenticated user

## Events

There is one 'current' event; requests to the root of the site will display information on the 'current' event.
A different as-yet-undetermined URL route could/would allow access to previous/future events (e.g. /events/2021walk/*)

- An event has multiple teams.
- An event has a location
- An event can have a schedule of activities (out of scope for 2021)
- An event has sponsor tiers are based on donation amounts
- An event has a fundraising goal

## Teams

- A team only exists within an event.  
- Team owners can manage members on their team  
- Team owners can set fundraising goals for their team  
- Team owners can set the story, the picture, the description, video link, etc. for the team.  

## Person
- A person has a name, an email, 

## Donations / Pledges(?)
- Any donation can be made anonymous or linked to a logged-in user  
- Donations can be made to an event or to a specific team  
- A donation can have a sponsorID (but cannot have both a sponsorID and a personID)

# Sponsors
- Track sponsors globally
- Many-to-many sponsor to event relationship
- Sponsors can be flagged as ActiveRecurring, if so flagged they'll be automatically added as sponsors to new events
- For MVP, sponsors are added/updated by admin, not public.  In the future we could let people sign up themselves as a sponsor.



# T-Shirts & Food (out of scope for 2021)
- A set of add-ons exists per event  
- Add-ons could be t-shirts, food items, etc.  
- Each add-on can have indiv. details (e.g. shirt size)  
- A registration owner can purchase add-ons for the regsitration members of their registration  
  - That can be 0+ of each add-on per registration member.  


# Gamification of donations (out of scope for 2021)
There are different fundraising tier amounts, (e.g. $500 for 6 movie tickets, $1k for a kindle, $2k for an iPad, etc.)  Prizes are public on the sign-up page.  Show whatever prize you most recently qualified for and how far away you are from the next prize.  Prizes are per event.

