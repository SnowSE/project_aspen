import { useModal, CustomModal, ModalButton } from "../../components/CustomModal"

export const BenefitsModal = () => {
  const eventDetailModalControl = useModal("Benefits", "lg")

  const ModalButton: ModalButton = ({ showModal }) => (
    <button className="btn text-info"
      onClick={showModal}>BENEFITS OF CHARITY TEAMS</button>
  )
  return (
    <CustomModal ModalButton={ModalButton} controls={eventDetailModalControl}>
      <>
        <div className="modal-header">
          <div className="modal-title fw-bold fs-4">Benefits of Joining a Charity Event Team</div>
        </div>
        <div className="modal-body">
          <ul>
            <li>Joining a team for a charity event is a powerful way to maximize your impact and make a positive difference in the lives of others.</li>
            <li>When you're part of a team, you benefit from the camaraderie and collective motivation, which encourages you to contribute more generously than you might on your own.</li>
            <li>The spirit of friendly competition among teams drives each member to push their limits, resulting in a greater overall contribution to the cause.</li>
            <li>Being part of a team fosters a sense of belonging, creating a network of passionate individuals united by a common goal.</li>
            <li>By working together and leveraging each other's strengths, you not only raise more funds for the charity, but you also forge lasting connections that strengthen your community and promote a culture of giving.</li>
          </ul>
          <div className="row mx-5 my-3">
            <button className="btn text-info"
              onClick={() => eventDetailModalControl.hide()}>CLOSE</button>
          </div>
        </div>
      </>
    </CustomModal>
  )
}
