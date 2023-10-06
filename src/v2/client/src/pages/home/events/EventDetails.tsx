import { FC } from "react";
import { DonationProgess } from "../DonationProgess";
import { Event } from "../../../models/Event";

export const EventDetails: FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="card shadow">
      <div className="card-header bg-primary">
        <div className="card-title fs-4 text-white">Upcoming Event: {event.title}</div>
      </div>
      <div className="card-body text-start">
        <div className="card-text">{event.description}</div>
        <div className="card-text"><i className="bi-pin-map pe-1" />{event.location}</div>
        <div className="card-text"><i className="bi bi-clock pe-1" />{new Date(event.date).toDateString()}</div>
        <hr />
        <DonationProgess event={event} />
        <div className="row mt-2">
          <div className="col text-end">
            <button className="btn btn-secondary text-white">SHARE</button>
          </div>
          <div className="col">
            <button className="btn btn-secondary text-white">DONATE</button>
          </div>
        </div>
      </div>
    </div>
  )
}
