import { TeamCard } from "./Interfaces";

export const getTeamsList = async (id:number) => {
    
    
    const apiUrL = process.env.PUBLIC_URL + `/api/teams/event/${id}`;

    const res = await fetch(apiUrL)
    const response = await res.json()
    const otherArray: typeof TeamCard[] = response
    return otherArray
}