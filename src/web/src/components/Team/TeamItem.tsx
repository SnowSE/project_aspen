import { FC } from "react";
import { Link } from "react-router-dom";
import Team from "../../models/team";

const defaultImageUrl =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-7DsADfq2BX4%2FXlyf7aSybcI%2FAAAAAAABXq8%2Fut72jfLtCuo8ZvRGp1kqCYEbeQ0dOR8pgCNcBGAsYHQ%2Fs1600%2Fno_image_tate.jpg&f=1&nofb=1";

export type Props = {
  team: Team;
  ownerId: number;
  onJoinTeam: (team: Team) => void;
};

const TeamItem: FC<Props> = (props): JSX.Element => {
  const imageUrl =
    props.team.mainImage.trim().length === 0
      ? defaultImageUrl
      : props.team.mainImage;
  
  return (
    <div className="border container-fluid w-100 border-2 m-2 p-2">
      <div className="row">
        <div className="col-3">
          <img
            className="img-fluid w-100"
            src={imageUrl}
            alt={`team ${props.team.name}`}
          />
        </div>
        <div className="col">
          <Link
            to={`/team/${props.team.id}`}
            className="fs-4 bold text-decoration-none"
          >
            {props.team.name}
          </Link>
          <p>
            {props.team.description.slice(0, 256) +
              (props.team.description.length > 256 ? "..." : "")}
          </p>
          <div className="d-flex justify-content-end">
            <Link
              to={`/team/${props.team.id}`}
              className="btn btn-outline-primary"
            >
              Learn More
            </Link>
            <button
              className="btn btn-primary ms-2"
              type="button"
              onClick={() => props.onJoinTeam(props.team)}
            >
              Join Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamItem;
