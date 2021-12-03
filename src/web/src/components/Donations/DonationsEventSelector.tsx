import EventCard from "../Events/EventCard"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useStoreSelector } from "../../store";
import { getEventList } from "../../store/eventSlice";

export default function DonationsEventSelector() {
    const events = useStoreSelector((state) => state.event.events);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEventList());
    }, [dispatch]);
    return (
        <div className="w-100">
            {events.map((event) => <div className="flex-column my-3">
                <EventCard event={event} />
                <div className='row'>
                    <button id="responsive-expand-button" className="btn btn-primary" type="button">View Donations</button>
                </div>
            </div>)}
        </div>
    )
}
