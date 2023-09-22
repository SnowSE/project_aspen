import { FC, useEffect, useRef } from "react";
import { Spinner } from "../../../components/Spinner";
import { useGetEventTeamsQuery, useGetUsersEventTeamsQuery } from "./teamHooks"
import { Popover } from "bootstrap";

export const CharityTeams: FC<{ eventId: number }> = ({ eventId }) => {
  const popoverRef = useRef<HTMLButtonElement>(null)
  const teamsQuery = useGetEventTeamsQuery(eventId);
  const allTeams = teamsQuery.data ?? []
  const userTeamsQuery = useGetUsersEventTeamsQuery(eventId, 1)
  const usersTeams = userTeamsQuery.data ?? []
  const otherTeams = allTeams.filter(t => !usersTeams.includes(t))

  useEffect(() => {
    if (popoverRef.current) {
      new Popover(popoverRef.current, {
        content: "Create New Team",
        trigger: "hover",
        placement: "top"
      });
    }
  });

  if (teamsQuery.isLoading || userTeamsQuery.isLoading) return <Spinner />
  if (teamsQuery.isError || userTeamsQuery.isError) return <h3>Error getting teams for event</h3>
  if (!teamsQuery.data || !userTeamsQuery.data) return <h3>Unable to get teams for event</h3>

  return (
    <div className="card shadow">
      <div className="card-header bg-primary">
        <div className="row mx-2">
          <div className="col offset-1">
            <div className="card-title fs-4 text-white">Charity Teams</div>
          </div>
          <div className="col-1 my-auto">
            <button className="btn btn-secondary text-white"
              ref={popoverRef}><i className="bi bi-plus-square" /></button>
          </div>
        </div>
      </div>
      <div className="card-body text-start">
        {usersTeams.length > 0 && (
          <>
            <div>Your Teams:</div>
            <div className="row">
              {usersTeams.map((t) => (
                <div className="col-6">
                  <div className="card">
                    <div className="card-img bg-success">
                      <img src={t.mainImage} alt="Team" />
                    </div>
                    <div className="card-body">
                      <div className="card-title">{t.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {otherTeams.length > 0 && (
          <>
            <div>Join Team:</div>
            <div className="row">
              {otherTeams.map((t) => (
                <div className="col-6">
                  <div className="card">
                    <div className="card-img bg-success">
                      <img src={t.mainImage} alt="Team" />
                    </div>
                    <div className="card-body">
                      <div className="card-title">{t.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
