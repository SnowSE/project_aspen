import { TeamCard } from "./Interfaces";

export const getTeamsList = async () => {
    const apiUrL = 'https://localhost:44478/aspen/new/api/teams/event/1';

    const res = await fetch(apiUrL)
    const response = await res.json()
    const otherArray: typeof TeamCard[] = response
    return otherArray
}