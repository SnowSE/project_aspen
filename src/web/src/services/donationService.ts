import axios from "axios";
import Donation from "../models/donation";
const url = `${process.env.PUBLIC_URL}/api/donations`;
const adminUrl = `${process.env.PUBLIC_URL}/api/Admin/donations`;

const createDonation = async (donation: Donation) => {
    const res = await axios.post<Donation>(url, donation);
    return res.data
}

const getDonationsByEvent = async (eventID: number, token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.get<number>(adminUrl+ '/' +eventID , config)
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
    const res = await axios.get<number>(adminUrl+ '/' +eventID +'/'+teamID, config)
    return res.data
}

const getDonationAmountByTeam = async (eventID: number, teamID : number) => {
    const res = await axios.get<number>(url+ '/' +eventID +'/'+teamID)
    return res.data
}

const donationService = {
    createDonation,
    getDonationAmountByEvent,
    getDonationAmountByTeam
}

export default donationService;

