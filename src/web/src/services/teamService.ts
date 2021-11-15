import axios from "axios";
import Registration from "../models/registration";
import Team from "../models/team"

const url = `${process.env.PUBLIC_URL}/api/teams`;
const registrationUrl = `${process.env.PUBLIC_URL}/api/Registration`

const getAllTeams = async () =>{
    const res = await axios.get<Team[]>(url);
    return res.data;
}

const createTeam = async (team :Team) =>{
    const res = await axios.post<Team>(url + `?eventId=${team.eventID}`, team)
    return res.data;
}

const createRegistration = async (registration: Registration) => {
    const res = await axios.post<Registration>( registrationUrl, registration)
    return res.data
}

const teamService={
    getAllTeams,
    createTeam,
    createRegistration
}
export default teamService; 
