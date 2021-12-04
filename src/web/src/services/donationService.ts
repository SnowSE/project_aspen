import axios from "axios";
import Donation from "../models/donation";
const url = `${process.env.PUBLIC_URL}/api/donations`;

const createDonation = async (donation: Donation) => {
    const res = await axios.post<Donation>(url, donation);
    return res.data
}

const getDonationByEvent = async (eventID: number) => {
    const res = await axios.get<number>(url+ '/' +eventID)
    return res.data
}

const getDonationByTeam = async (eventID: number, teamID : number) => {
    const res = await axios.get<number>(url+ '/' +eventID +'/'+teamID)
    return res.data
}

const donationService = {
    createDonation,
    getDonationByEvent,
    getDonationByTeam
}

export default donationService;

