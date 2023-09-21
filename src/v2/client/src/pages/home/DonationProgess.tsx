import { FC } from "react"
import { Event } from "../../models/Event"
import { useGetEventDonationQuery } from "./events/eventHooks";
import { Spinner } from "../../components/Spinner";

export const DonationProgess: FC<{
  event?: Event
}> = ({ event }) => {
  const getEventDonationQuery = useGetEventDonationQuery(event?.id);

  if (getEventDonationQuery.isLoading) return <Spinner />
  if (!event) return <div className="fs-5">No Event Donations</div>

  const donated = getEventDonationQuery.data ? Math.round(getEventDonationQuery.data / event?.donationTarget * 100) : 0

  return (
    <>
      <div className="fs-5 text-center"><span className="fw-bold">{donated}%</span> of our ${event.donationTarget} goal</div>
      <div className="progress bg-success-subtle">
        <div className="progress-bar bg-success"
          style={{ width: (donated / event.donationTarget * 100) + "%" }}
          role="progressbar"
          aria-valuenow={donated}
          aria-valuemin={1}
          aria-valuemax={event.donationTarget} />
      </div>
    </>
  )
}
