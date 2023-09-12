import axios from "axios";
import Team from "../models/team"

const teamUrl = `${process.env.PUBLIC_URL}/api/teams`;
const donationsUrl = `${process.env.PUBLIC_URL}/api/donations`;

const getAllTeams = async (eventID: number) => {
    const res = await axios.get<Team[]>(teamUrl + `/event/${eventID}`);
    return res.data;
}

const getTeamsByEventId = async (id: number) => {
    const res = await axios.get(teamUrl + '/event/' + id)
    if (res.status !== 200) {
        throw Error("Api error getting teams by event id");
    }
    return res.data;
}

const createTeam = async (team: Team) => {
    const thisTeam = {
        name: team.name,
        description: team.description,
        mainImage: team.mainImage,
        ownerID: team.ownerID,
        eventID: team.eventID,
        donationTarget: team.donationTarget
    }
    const res = await axios.post<Team>(teamUrl, thisTeam)
    return res.data;
}

const getTeamById = async (teamId: number): Promise<Team> => {
    const res = await axios.get<Team>(teamUrl + `/${teamId}`);
    return res.data;
}

const getDonationsByTeamId = async (eventId: number, teamId: number): Promise<number> => {
    const res = await axios.get<number>(donationsUrl + `/${eventId}/${teamId}`);
    return res.data;
};

const teamService = {
    getAllTeams,
    createTeam,
    getTeamsByEventId,
    getTeamById,
    getDonationsByTeamId
}
export default teamService;
