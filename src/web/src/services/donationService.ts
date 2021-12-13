import axios from "axios";
import Donation from "../models/donation";
import { store } from "../store";
import { alertActions } from "../store/alertSlice";
 
const url = `${process.env.PUBLIC_URL}/api/donations`;
const adminUrl = `${process.env.PUBLIC_URL}/api/Admin/donation`;

const createDonation = async (donation: Donation) => {
    const res = await axios.post<Donation>(url, donation)
        .catch((error) => {
            return error
        });
    return res
}

const getDonationsByEvent = async (eventID: number, token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.get<Donation[]>(adminUrl+ '/' +eventID , config).catch((error) => { 
        store.dispatch(alertActions.displayAlert({ title: error.response.status, message: "Your login credentials are invalid. Please try logging in again.", danger: true }))
        return {data:[]}
     })

    return res.data
}
const getDonationAmountByEvent = async (eventID: number) => {
    const res = await axios.get<number>(url+ '/' +eventID)
    return res.data
}
const getDonationsByTeam = async (eventID: number, teamID : number, token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.get<Donation[]>(adminUrl+ '/' +eventID +'/'+teamID, config)
    return res.data
}

const getDonationAmountByTeam = async (eventID: number, teamID : number) => {
    const res = await axios.get<number>(url+ '/' +eventID +'/'+teamID)
    return res.data
}

const donationService = {
    createDonation,
    getDonationsByEvent,
    getDonationAmountByEvent,
    getDonationsByTeam,
    getDonationAmountByTeam
}

export default donationService;

