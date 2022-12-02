import { TeamCard } from "./Interfaces";

export const getTeamsList = async () => {

    
    const apiUrL = process.env.PUBLIC_URL + '/api/teams/event/1';

    const res = await fetch(apiUrL)
    const response = await res.json()
    const otherArray: typeof TeamCard[] = response
    return otherArray
}