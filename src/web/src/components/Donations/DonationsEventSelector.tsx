import EventCard from "../Events/EventCard"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useStoreSelector } from "../../store";
import { getEventList } from "../../store/eventSlice";
import { useState } from "react";
import donationService from '.././../services/donationService'

export default function DonationsEventSelector() {
    //const user = useStoreSelector((state) => state.auth.user);
    const events = useStoreSelector((state) => state.event.events);
    var [myEvents, setMyEvents] = useState<any[]>([])
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEventList());
    }, [dispatch]);

    useEffect(() => {
        async function initializeDonations() {
            var eventResult = await Promise.all(events.map(async (event) => {
                var currentEventDonations = await donationService.getDonationAmountByEvent(event.id)
                return { ...event, donations: currentEventDonations }
            }))
            setMyEvents(eventResult)
        }
        initializeDonations()
    }, [events]);
    return (
        events ? <>
            {myEvents.map((event) => <div className="my-3 container-fluid border border-primary">
                <EventCard event={event} />
                <div className='row text-center'>
                    <h5 className="">collected: {event.donations}$</h5>
                </div>
            </div>)}
        </> : <h1>Loading...</h1>
    )
}
