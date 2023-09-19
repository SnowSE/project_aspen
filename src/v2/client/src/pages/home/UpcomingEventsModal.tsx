import { FC } from "react"
import { CustomModal, useModal, ModalButton } from "../../components/CustomModal"
import { Event } from "../../models/Event"

export const UpcomingEventsModal: FC<{
  event: Event
}> = ({ event }) => {
  const eventDetailModalControl = useModal("Event Details", "lg")

  const ModalButton: ModalButton = ({ showModal }) => (
    <button className="btn btn-secondary text-white"
      onClick={showModal}>EVENT DETAILS</button>
  )
  return (
    <CustomModal ModalButton={ModalButton} controls={eventDetailModalControl}>
      <div className="modal-content ">
        <div className="modal-header">
          <div className="modal-title fw-bold fs-4">{event.title}</div>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div>Location: {event.location}</div>
          <div>Description: {event.description}</div>
          <div className="row mx-5 my-3">
            <button className="btn btn-secondary text-white"
              onClick={() => eventDetailModalControl.hide()}>OK</button>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}
