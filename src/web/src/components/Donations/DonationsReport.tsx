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
            if (user) {
                var bearer_token = user.access_token
                var donationsResponse = await Promise.all(events.map(async (event) => {
                    return await donationService.getDonationsByEvent(event.id, bearer_token)
                }))
                var currentDonations: Donation[] = []
                donationsResponse.forEach(donation => {
                    currentDonations = [...currentDonations, ...donation]
                    setDonations([...currentDonations])
                });
            }
            else setDonations([])
        }
        initializeDonations()
    }, [events, user]);
    return (

        <table className="table">
            <thead>
                <tr data-testid="headers">
                    <th scope="col">Event ID</th>
                    <th scope="col">Team ID</th>
                    <th scope="col">Person ID</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col">Is Pending</th>
                </tr>
            </thead>
            <tbody>
                {donations.length !== 0 ? <>
                    {donations.map(donation => <tr key={donation.id}>
                        <th scope="row">{donation.eventID}</th>
                        <td>{donation.teamID}</td>
                        <td>{donation.personID ?? 'not provided'}</td>
                        <td>{donation.amount}$</td>
                        <td>{donation.date}</td>
                        <td>{donation.isPending}</td>
                    </tr>)}
                </> : <tr data-testid="loading-row">
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>}
            </tbody>
        </table>

    )
}
