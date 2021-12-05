import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useStoreSelector } from "../../store";
import { getEventList } from "../../store/eventSlice";
import { useState } from "react";
import donationService from '../../services/donationService'
import Donation from "../../models/donation";

export default function DonationReport() {
    const user = useStoreSelector((state) => state.auth.user);
    const events = useStoreSelector((state) => state.event.events);
    const [donations, setDonations] = useState<Donation[]>([])
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEventList());
    }, [dispatch]);

    useEffect(() => {
        async function initializeDonations() {
            var bearer_token = ''
            if (user) {
                bearer_token = user.access_token
            }
            var donationsResult = await Promise.all(events.map(async (event) => {
                var currentEventDonations = await donationService.getDonationsByEvent(event.id, bearer_token)
                return currentEventDonations
            }))
            console.log(donationsResult)
            var donationsToSet: Donation[] = []
            donationsResult.forEach(donation => {
                console.log(donation)
                donationsToSet = [...donationsToSet, ...donation]
            });
            setDonations(donationsToSet)
        }
        initializeDonations()
    }, [events, user]);
    return (
        donations.length !== 0 ? <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Event ID</th>
                        <th scope="col">Team ID</th>
                        <th scope="col">Person ID</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Is Pending</th>

                    </tr>
                </thead>
                <tbody>
                    {donations.map(donation => <tr key={donation.id}>
                        <th scope="row">{donation.eventID}</th>
                        <td>{donation.teamID}</td>
                        <td>{donation.personID ?? 'not provided'}</td>
                        <td>{donation.amount}$</td>
                        <td>{donation.date}</td>
                        <td>{donation.isPending}</td>
                    </tr>)}
                </tbody>
            </table>
        </> : <h4>Loading...</h4>
    )
}
