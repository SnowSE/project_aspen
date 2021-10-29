import { getEventList }  from "../store/EventSlice";
import { useSelector } from "react-redux";

function EventList(){
    const events = useSelector(state => state.events.events)
    return(
        <>
        {
            events.map( event =>{
                <>
                <h4>{event.date}</h4>
                <h4>{event.location}</h4>
                <p>{event.description}</p>
                <h4>{event.image}</h4>
                </>
            })
            
        }
        </>
    )
}

export default EventList;