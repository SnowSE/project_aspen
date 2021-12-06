import { FC } from "react";

type Props = {
    imageUrls: string[]
}

const ImageCarousel: FC<Props> = (props): JSX.Element => {
    return (
        <div id="imageCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {props.imageUrls.map((src, i) => (
                    <div className={`carousel-item ${i === 0 && 'active'}`}>
                        <img src={src} className="d-block w-100" alt="..." />
                    </div>
                ))}
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