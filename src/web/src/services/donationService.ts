import axios from "axios";
const url = `${process.env.PUBLIC_URL}/api/donations`;

const getEventDonations= async (eventID: number) => {
  const res = await axios.get<number>(url + `/${eventID}`);
  return res.data;
};
const getTeamEventDonations = async (eventID: number, teamID: number) => {
  const res = await axios.get<number>(url + `/${eventID}/${teamID}`);
  return res.data;
};
const donationService = {
    getEventDonations,
    getTeamEventDonations
};

export default donationService