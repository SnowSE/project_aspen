import axios from "axios";
import Registration from "../models/registration";
import Team from "../models/team"

const url = `${process.env.PUBLIC_URL}/api/teams`;
const registrationUrl = `${process.env.PUBLIC_URL}/api/Registration`

const getAllTeams = async (eventID: number) =>{
    const res = await axios.get<Team[]>(url+`/event/${eventID}`);
    return res.data;
}

const getTeamsByEventId = async (id: number) =>{
    const res = await axios.get(url + '/event/' + id)
    if (res.status !== 200) {
        console.log(res);
        throw Error("Api error getting teams by event id");
      }
      return res.data;
}

const createTeam = async (team :Team) =>{
    const thisTeam={
        name: team.name,
        description: team.description,
        mainImage: team.mainImage,
        ownerID: team.ownerID,
        eventID: team.eventID
    }
    const res = await axios.post<Team>(url, thisTeam)
    console.log(res)
    return res.data;
}

const createRegistration = async (registration: Registration) => {
    const res = await axios.post<Registration>( registrationUrl, registration)
    return res.data
}

const teamService={
    getAllTeams,
    createTeam,
    createRegistration,
    getTeamsByEventId
}
export default teamService; 
