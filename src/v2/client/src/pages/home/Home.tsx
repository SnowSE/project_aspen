import { Spinner } from "../../components/Spinner";
import { BenefitsModal } from "./BenefitsModal";
import { UpcomingEventsModal } from "./UpcomingEventsModal";
import { useGetEventsQuery } from "./homeHooks";
import { Event } from "../../models/Event";
import { DonationProgess } from "./DonationProgess";

export const Home = () => {
  const getEventsQuery = useGetEventsQuery();
  const events = getEventsQuery.data ?? [];
  const futureEvents = events.filter(e => new Date(e.date) >= new Date() && e.isArchived === false)
  const currentEvent = futureEvents.length > 0 ? futureEvents[0] : undefined

  if (getEventsQuery.isLoading) return <Spinner />

  return (
    <div className="container mt-3 text-center">
      <div className="bg-primary shadow text-white ">
        {currentEvent ? (
          <h3>Upcoming Event: {currentEvent.title}</h3>
        ) : (
          <h3>There are currently no upcoming events</h3>
        )}
        <iframe
          data-testid={"homePageVideo"} id={"homePageVideo"}
          src="https://www.youtube.com/embed/wkFlIx9sV04"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          height="450"
          style={{ width: "100%" }}
          allowFullScreen />
        <DonationProgess event={currentEvent} />
        <div className="row py-3">
          <div className="col-5 text-end">
            <button className="btn btn-secondary text-white">SHARE NOW</button>
          </div>
          <div className="col-auto">
            {currentEvent && <UpcomingEventsModal event={currentEvent} />}
          </div>
          <div className="col-auto">
            <button className="btn btn-secondary text-white">DONATE</button>
          </div>
        </div>
      </div>
      <div className="bg-light shadow px-3">
        <div className="fw-bold text-black fs-4">Charity Teams</div>
        <div className="text-start">Joining a charity team is a fulfilling way to make a positive impact while connecting with like-minded individuals who share your passion for giving back.</div>
        <div className="my-3">
          <BenefitsModal />
        </div>
        <div className="row pb-3">
          <div className="col text-end">
            <button className="btn btn-secondary text-white">ACTIVE TEAMS</button>
          </div>
          <div className="col text-start">
            <button className="btn btn-secondary text-white">CREATE A TEAM</button>
          </div>
        </div>
      </div>
    </div >
  )
}
