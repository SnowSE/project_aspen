const EventTeam = () => {
  const img_url = "https://i.imgflip.com/1ozhy.jpg";
  const info = `For this event you raise money by eating as many hot dogs as possible. The more hot dogs you eat, the more money your charity gets. 
    your team score is the average of all of the hot dogs that your team ate. Also, no ralphing, upchucking, puking, spewing, spitting, or any other manner of \
    reverse eating are allowed. Immediate disqualification will ensue.`;
  return (
    <div className="card text-center bg-light">
      <img
        src={img_url}
        alt="team logo"
        width="550"
        height="200"
        className="pb-3"
      />
      <hr />
      <p className="card h-100">{info}</p>
    </div>
  );
};

export default EventTeam;
