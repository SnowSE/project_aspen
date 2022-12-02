import { useMutation, useQuery } from "react-query";
import { AspenEvent } from "../../interfaces";
import { getQueryClient } from "../QueryClient";
import { EventsService } from "./EventsService";

const queryClient = getQueryClient();

// https://tkdodo.eu/blog/practical-react-query
export const EventsHooks = {
  useEventsQuery: () =>
    useQuery(["eventsList"], EventsService.GetEventsViaAxios),
  addEventsQuery: async (newEvent:AspenEvent) => 
    useQuery(["addEvent", newEvent],  await EventsService.CreateEventViaAxios(newEvent)),
  useEventUpdateMutation: (id: number) =>
    useMutation(
      async (e: AspenEvent) => {
        //await EventsService.UpdateEvent(e);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["addEvent"]);
          queryClient.invalidateQueries(["eventsList"]);
        },
      }
    ),
};