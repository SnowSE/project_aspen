import { CustomModal, useModal, ModalButton } from "../../components/CustomModal"

export const UpcomingEventsModal = () => {
  const eventDetailModalControl = useModal("Event Details", "lg")

  const ModalButton: ModalButton = ({ showModal }) => (
    <button className="btn btn-secondary text-white"
      onClick={showModal}>EVENT DETAILS</button>
  )
  return (
    <CustomModal ModalButton={ModalButton} controls={eventDetailModalControl}>
      <div className="modal-body text-center">
        <div className="fw-bold fs-3">Event: There are currently no upcoming events</div>
        <div className="row mx-5 my-3">
          <button className="btn btn-secondary text-white"
            onClick={() => eventDetailModalControl.hide()}>OK</button>
        </div>
      </div>
    </CustomModal>
  )
}
