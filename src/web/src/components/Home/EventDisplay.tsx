import EventList from "../EventList"
import { useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useStoreSelector } from "../../store";
import { getEventList } from "../../store/eventSlice";
import EventModel from "../../models/event";
import EventInfo from "./EventInfo";
import EventDisplayButtonBar from "./EventDisplayButtonBar";


const EventDisplay = () =>{
    const events = useStoreSelector(state => state.event.events);
    const [event, setEvent] = useState<EventModel>(new EventModel()); 
    useEffect(() => {
       dispatch(getEventList()); 
        const dummyEvent = new EventModel(new Date(0), "", "There are currently no upcomming events.", "")
        const today = new Date();
        const closestEvent= events.reduce((a, b)=> {const diff = a.date.getTime() - today.getTime();
        return diff > 0 && diff < b.date.getTime() - today.getTime() ? a:b});
        if(typeof(closestEvent) !== "undefined"){
            setEvent(closestEvent);
        }
        else{
            setEvent(dummyEvent);
        }

    }, [events])

    const dispatch = useDispatch();

   
    return(
        <div>
           {
               events.length > 0 ? <>
               <EventInfo event={event}/> 
               </>
               : <>
               <EventInfo event={event}/>
               </>
               
           }
        </div>
    )
}
export default EventDisplay;