
export const Home = () => {
  const width = 1;
  return (
    <div className="container mt-3 text-center">
      <div className="bg-primary shadow text-white ">
        <h3>There are currently no upcoming events</h3>
        <iframe
          data-testid={"homePageVideo"} id={"homePageVideo"}
          src="https://www.youtube.com/embed/wkFlIx9sV04"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          height="450"
          style={{ width: "100%" }}
          allowFullScreen />
        <div className="fs-5"><span className="fw-bold">0%</span> of our $0 goal</div>
        <div className="row">
          <div className="col-6 offset-3">
            <div className="progress bg-success-subtle">
              <div className="progress-bar bg-success" style={{ width: width + "%" }} role="progressbar" aria-valuenow={width} aria-valuemin={1} aria-valuemax={100} />
            </div>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-5 text-end">
            <button className="btn btn-secondary text-white">SHARE NOW</button>
          </div>
          <div className="col-auto">
            <button className="btn btn-secondary text-white">EVENT DETAILS</button>
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
          <button className="btn text-info">BENEFITS OF CHARITY TEAMS</button>
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
    </div>
  )
}
