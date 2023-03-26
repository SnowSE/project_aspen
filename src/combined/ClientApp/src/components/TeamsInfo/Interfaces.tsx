import { Button, Card } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";
import Team from "../../JsModels/team";

export const TeamCard = ({
    id,
    name,
    description,
    mainImage,
    ownerID,
    eventID,
    donationTarget,
    persons,
    WelcomeMessage
}: Team) => {

  const navigate = useNavigate();
  
  return (
    <div style={{ paddingTop: "1rem", justifyContent: "flex-start" }}>
      <div className="d-flex justify-content-start">
        <div>
          <Card style={{ width: "30rem" }}>
            <div
              className="TeamsListCard">
              <Button
                className="TeamsListText"
                onClick={() => {
                  navigate({
                    pathname: "/TeamDetails",
                    search: `?${createSearchParams({
                      teamId: `${id}`,
                      ownerID: `${ownerID}`,
                    })}`,
                  });
                }}>
                {name}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
