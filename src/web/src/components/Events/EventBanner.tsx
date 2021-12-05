import EventModel from "../../models/event";
import ImageCarousel from "../UI/ImageCarousel";

interface Props {
  event: EventModel;
}
const EventBanner = ({ event }: Props) => {
  const imgUrls = [
    "https://wallpaperaccess.com/full/5356065.jpg",
    "https://wallpaperaccess.com/full/5356101.jpg",
    "https://wallpaperaccess.com/full/5356202.jpg"
  ];

  return (
    <div className="text-center">
      <h1>{event.title}</h1>
      <hr />
      <ImageCarousel imageUrls={imgUrls}/>
    </div>
  );
};

export default EventBanner;
