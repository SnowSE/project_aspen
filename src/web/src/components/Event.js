import NavBar from './NavBar';
import EventList from './EventList';
import NewEventForm from './Forms/NewEventForm';

function Event(props){
    
    return(
        <div>
            <h1>Current Events</h1>
            <EventList/>
            <h1>New Event</h1>
            <NewEventForm/>
        </div>
    );
}

export default Event;