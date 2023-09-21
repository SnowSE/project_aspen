import axios from "axios";
import { Team } from "../../../models/Team";

export const teamService = {
  async getTeamsForEvent(id: number): Promise<Team[]> {
    const url = `/api/teams/event/${id}`
    const response = await axios.get(url)
    return response.data
  },
  async getUsersTeamsForEvent(id: number, userId: number): Promise<Team[]> {
    const url = `/api/teams/event/${id}/user/${userId}`
    const response = await axios.get(url)
    return response.data
  },
}