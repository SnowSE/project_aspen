import { useQuery } from "@tanstack/react-query"
import { teamService } from "./teamService"


export const teamsKey = {
  eventTeamsKey: (id: number) => ["eventTeams", id] as const
}

export const useGetEventTeamsQuery = (id: number) => {
  return useQuery({
    queryKey: teamsKey.eventTeamsKey(id),
    queryFn: async () => await teamService.getTeamsForEvent(id)
  })
}

export const useGetUsersEventTeamsQuery = (id: number, userId: number) => {
  return useQuery({
    queryKey: teamsKey.eventTeamsKey(id),
    queryFn: async () => await teamService.getUsersTeamsForEvent(id, userId)
  })
}