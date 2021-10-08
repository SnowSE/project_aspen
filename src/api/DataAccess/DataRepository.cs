using Aspen.Api;
using Aspen.Api.DatabaseModels;
using dotnet.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet.DataAccess
{
    public class DataRepository
    {
        private readonly AspenContext _context;

        public DataRepository(AspenContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        //Event*******************************
        public bool EventExists(string eventID)
        {
            return _context.Events.Any(e => e.ID == eventID);
        }

        //Get all events
        public async Task<IEnumerable<Event>> GetEventsAsync()
        {
            return await EntityFrameworkQueryableExtensions.ToListAsync(_context.Events.include(e=> e.Teams));
        }

        //Get event
        public async Task<Event> GetEventAsync(string eventID)
        {
            return await Task.Run(() => _context.Events
                .First(r => r.ID == eventID))
                .ThenInclude(e => e.Teams);
        }

        //Add event

        public async Task AddEventAsync(Event event)
        {
            if (!EventExists(event.ID)){
                 _context.Events.Add(event);
                await _context.SaveChangesAsync();
            }
        }

        //edit event
        public async Task EditEventAsync(Event event)
        {
            _context.Update(event);
            await _context.SaveChangesAsync();
        }

        //delete event
        public async Task DeleteEventAsync(string eventID)
        {
            var event = await _context.Events.FindAsync(eventID);

            _context.Events.Remove(event);
            await _context.SaveChangesAsync();
        }


        //Team*******************************
        public bool TeamExists(string teamID)
        {
            return _context.Teams.Any(e => e.ID == teamID);
        }

        //Get all teams
        public async Task<IEnumerable<Team>> GetEventsAsync()
        {
            return await EntityFrameworkQueryableExtensions.ToListAsync(_context.Teams);

        }

        //Get team
        public async Task<Team> GetTeamAsync(string teamID)
        {
            return await Task.Run(() => _context.Teams
                .First(r => r.ID == teamID));
        }

        //Add team
        public async Task AddTeamAsync(Team team)
        {
            if (!TeamExists(team.ID)){
                 _context.Teams.Add(team);
                await _context.SaveChangesAsync();
            }
        }

        //Add event team
        public async Task AddEventTeamAsync(string eventID, Team team){

            var event = await EntityFrameworkQueryableExtensions.FirstOrDefaultAsync(_context.Events, c => c.ID == eventID);

            if(!TeamExists(team.ID)){
                event.Teams.Add(team)
            }else{
                _context.Teams.Add(team);
                await _context.SaveChangesAsync();

                event.Teams.Add(team)
            }
        }

        //edit team
        public async Task EditTeamAsync(Team team)
        {
            _context.Update(team);
            await _context.SaveChangesAsync();
        }

        //delete team
        public async Task DeleteEventAsync(string teamID)
        {
            var team = await _context.Teams.FindAsync(teamID);

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();
        }

        //Registration*******************************
        public bool RegistrationExists(string registrationID)
        {
            return _context.Registrations.Any(e => e.ID == registrationID);
        }

        //Get all Registrations
        public async Task<IEnumerable<Registration>> GetRegistrationsAsync()
        {
            return await EntityFrameworkQueryableExtensions.ToListAsync(_context.Registrations);

        }

        //Add Registration

        public async Task AddRegistrationAsync(Registration registration)
        {
            if (!RegistrationExists(registration.ID)){
                 _context.Registrations.Add(registration);
                await _context.SaveChangesAsync();
            }
        }

        //edit Registration
        public async Task EditRegistrationAsync(Registration registration)
        {
            _context.Update(registration);
            await _context.SaveChangesAsync();
        }

        //delete Registration
        public async Task DeleteRegistrationAsync(string registrationID)
        {
            var registration = await _context.Registrations.FindAsync(registrationID);

            _context.Registrations.Remove(registration);
            await _context.SaveChangesAsync();
        }

    }
}

/*

//User *******************************

public async Task<User> LoginUserAsync(string userName, string password)
{

    var user = await _context.Users.FirstOrDefaultAsync(r => r.UserName == userName);

    if (user != null)
    {
        return user;
    }

    return user;
}


public bool UserExists(string userID)
{
    return _context.Users.Any(e => e.UserID == userID);
}

public async Task<User> GetUserAsync(string userID)
{
    return await Task.Run(() => _context.Users
            .First(r => r.UserID == userID));
}

public async Task AddUserAsync(User user)
{
    _context.Users.Add(user);
    await _context.SaveChangesAsync();
}

public async Task<IEnumerable<User>> GetUsersAsync()
{
    return await _context.Users.ToListAsync();
}

public async Task EditUserAsync(User user)
{
    _context.Update(user);
    await _context.SaveChangesAsync();

}


public async Task DeleteUserAsync(string userID)
{
    var user = await _context.Users.FindAsync(userID);

    _context.Users.Remove(user);
    await _context.SaveChangesAsync();
}

//UserWorkout*******************************

public bool UserWorkoutExists(string userWorkoutID)
{
    return _context.UserWorkouts.Any(e => e.Id == userWorkoutID);
}
public async Task<IEnumerable<UserWorkout>> GetUserWorkoutsListAsync()
{
    return await _context.UserWorkouts.ToListAsync();
}

public async Task AddUserWorkoutAsync(Workout workout, string userID)
{

    var user = await EntityFrameworkQueryableExtensions.FirstOrDefaultAsync(_context.Users, c => c.UserID == userID);


    var ExistingWorkout = await EntityFrameworkQueryableExtensions.FirstOrDefaultAsync(_context.Workouts, c => c.WorkoutID == workout.WorkoutID);

    //var workouts = await EntityFrameworkQueryableExtensions.ToListAsync(_context.Workouts);

    //var workout = workouts.FirstOrDefault(c => c.WorkoutID == workoutID);

    //var newUserWorkout = new Workout();

    if (ExistingWorkout == null)
    {
        _context.Workouts.Add(workout);
        await _context.SaveChangesAsync();

        var newUserWorkout = new UserWorkout()
        {
            Id = Guid.NewGuid().ToString("n"),
            WorkoutID = workout.WorkoutID,
            UserID = userID,
            Workout = workout,
            User = user,
            IsPublic = true,
        };

        _context.UserWorkouts.Add(newUserWorkout);
        await _context.SaveChangesAsync();

    }
    else
    {
        var newUserWorkout = new UserWorkout()
        {
            Id = Guid.NewGuid().ToString("n"),
            WorkoutID = ExistingWorkout.WorkoutID,
            UserID = userID,
            Workout = ExistingWorkout,
            User = user,
            IsPublic = false,
        };

        _context.UserWorkouts.Add(newUserWorkout);
        await _context.SaveChangesAsync();
    }

}


public async Task<IEnumerable<Workout>> GetUserWorkoutsAsync(string userID)
{
    return await Task.Run(() => _context.UserWorkouts
            .Where(m => m.UserID == userID)
            .Select(m => m.Workout)
            .ToList());
}

public async Task DeleteUserWorkoutAsync(string workoutID, string userID)
{

    //var workout = _context.UserWorkouts.Where(m => m.UserID == userID).Where(m => m.WorkoutID == workoutID).Select(m => m.Workout);

    var userWorkout = _context.UserWorkouts.Where(m => m.UserID == userID).Where(m => m.WorkoutID == workoutID).ToList();

    _context.UserWorkouts.Remove(userWorkout.FirstOrDefault(m => m.WorkoutID == workoutID));

    await _context.SaveChangesAsync();
}

public async Task DeleteUserWorkoutListAsync(string userID)
{

    var userWorkout = _context.UserWorkouts.Where(m => m.UserID == userID).ToList();

    foreach (var i in userWorkout)
    {
        _context.UserWorkouts.Remove(i);
    }

    await _context.SaveChangesAsync();
}

    }
}
*/