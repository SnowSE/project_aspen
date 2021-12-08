import axios from "axios";
import Team from "../models/team"

const url = `${process.env.PUBLIC_URL}/api/teams`;

const getAllTeams = async (eventID: number) =>{
    const res = await axios.get<Team[]>(url+`/event/${eventID}`);
    return res.data;
}

const getTeamsByEventId = async (id: number) =>{
    const res = await axios.get(url + '/event/' + id)
    if (res.status !== 200) {
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
        eventID: team.eventID,
        donationTarget: team.donationTarget
    }
    const res = await axios.post<Team>(url, thisTeam)
    return res.data;
}


const teamService={
    getAllTeams,
    createTeam,
    getTeamsByEventId
}
export default teamService; 
