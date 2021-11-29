import EventModel from "../../models/event";

interface Props {
  event: EventModel;
}
const EventBanner = ({ event }: Props) => {
  const img_url = "https://i.pinimg.com/originals/eb/f0/02/ebf002d6348c3ae432649da4418fce40.jpg";
  return (
    <>
      <img src={img_url} alt="team logo" width="100%" height="400px"/>
    </>
  );
};

export default EventBanner;
