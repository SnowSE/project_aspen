import classes from "../../assets/WideContainer.module.scss"
import { Spinner } from "../../components/Spinner";
import { EventDetails } from "./events/EventDetails";
import { useGetEventsQuery } from "./events/eventHooks";
import { CharityTeams } from "./teams/CharityTeams";

export const Home = () => {
  const getEventsQuery = useGetEventsQuery();
  const events = getEventsQuery.data ?? [];
  const futureEvents = events.filter(e => new Date(e.date) >= new Date() && e.isArchived === false)
  const currentEvent = futureEvents.length > 0 ? futureEvents[0] : undefined

  if (getEventsQuery.isLoading) return <Spinner />
  if (getEventsQuery.isError) return <h3>Error getting events</h3>
  if (!getEventsQuery.data) return <h3>Unable to get events</h3>


  return (
    <div className={`${classes.customContainer} mt-3 text-center`}>
      <div className="row">
        <div className="col">
          <iframe
            data-testid={"homePageVideo"} id={"homePageVideo"}
            src="https://www.youtube.com/embed/wkFlIx9sV04"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            height="450"
            style={{ width: "100%" }}
            allowFullScreen />
          <div className="bg-light shadow px-3">
            <div className="fw-bold text-black fs-4">Charity Teams</div>
            <div className="text-start">Joining a charity team is a fulfilling way to make a positive impact while connecting with like-minded individuals who share your passion for giving back.</div>
            <div className="pb-3">
              <div className="fw-bold fs-4">Benefits of Joining a Charity Event Team</div>
              <ul className="text-start">
                <li>Joining a team for a charity event is a powerful way to maximize your impact and make a positive difference in the lives of others.</li>
                <li>When you're part of a team, you benefit from the camaraderie and collective motivation, which encourages you to contribute more generously than you might on your own.</li>
                <li>The spirit of friendly competition among teams drives each member to push their limits, resulting in a greater overall contribution to the cause.</li>
                <li>Being part of a team fosters a sense of belonging, creating a network of passionate individuals united by a common goal.</li>
                <li>By working together and leveraging each other's strengths, you not only raise more funds for the charity, but you also forge lasting connections that strengthen your community and promote a culture of giving.</li>
              </ul>
            </div>
          </div>
        </div>
        {currentEvent && (
          <div className="col-4">
            <EventDetails event={currentEvent} />
            <div className="my-2">
              <CharityTeams eventId={currentEvent?.id} />
            </div>
          </div>
        )}
      </div>
    </div >
  )
}
