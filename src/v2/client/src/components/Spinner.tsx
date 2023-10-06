import "./Spinner.scss";

export const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
