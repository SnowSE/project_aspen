import EventModel from "../../models/event";



interface Props {
    imageUrls: string[];
    event: EventModel
}

const ImageCarousel = ({ imageUrls, event }: Props) => {
    return (
        <div id="imageCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
            {
                    imageUrls.map((_, index) => {
                        if (index === 0) return <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to={index} className="active" aria-current="true"></button>
                        else return <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to={index} aria-current="false"></button>
                    })
                }
            </div>    
            <div className="carousel-inner">
                {
                    imageUrls.map((url, index) => {
                        if (index === 0) return <div className="carousel-item active">
                            <img src={url} className="d-block banner-image" alt="..." />
                        </div>
                        else return <div className="carousel-item">
                            <img src={url} className="d-block banner-image" alt="..." />
                        </div>
                    })
                }
            </div>
            <div className="carousel-caption">
                <h1 className="text-shadow">{event.title}</h1>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
};

export default ImageCarousel;