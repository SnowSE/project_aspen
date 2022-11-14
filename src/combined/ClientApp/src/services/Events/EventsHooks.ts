import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { AspenEvent } from "../../interfaces";
import { getQueryClient } from "../QueryClient";
import { EventsService } from "./EventsService";

const queryClient = getQueryClient();

// https://tkdodo.eu/blog/practical-react-query
export const EventsHooks = {
  useEventsQuery: () =>
    useQuery(["eventsList"], EventsService.GetEventsViaAxios),
  useEventUpdateMutation: (id: number) =>
    useMutation(
      async (e: AspenEvent) => {
        //await EventsService.UpdateEvent(e);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["eventById", id]);
          queryClient.invalidateQueries(["eventsList"]);
        },
      }
    ),
};