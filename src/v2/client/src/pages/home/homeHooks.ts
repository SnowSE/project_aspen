import { useQuery } from "@tanstack/react-query"
import { homeService } from "./homeService"

export const eventsKey = {
  eventsKey: ["events"] as const,
  eventDonationKey: (id?: number) => ["eventDonation", id] as const,
}

export const useGetEventsQuery = () => {
  return useQuery({
    queryKey: eventsKey.eventsKey,
    queryFn: async () => await homeService.getEvents(),
  });
}

export const useGetEventDonationQuery = (id?: number) => {
  return useQuery({
    queryKey: eventsKey.eventDonationKey(id),
    queryFn: async () => {
      if (!id) return;
      return await homeService.getEventDonation(id)
    },
  });
} 