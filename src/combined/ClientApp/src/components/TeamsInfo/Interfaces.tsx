import { Box, Button, Card } from "@mui/material";
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
    <Box style={{ paddingTop: "1rem", justifyContent: "flex-start"}}>
          <Card style={{ width: "30rem", display: "block" }}>
            <Box
                  className="TeamsListCard"
                  onClick={() => {
                      navigate({
                          pathname: "/TeamDetails",
                          search: `?${createSearchParams({
                              teamId: `${id}`,
                              ownerID: `${ownerID}`,
                          })}`,
                      });
                  }}              >
              <Button
                className="TeamsListText"
                >
                {name}
              </Button>
            </Box>
          </Card>
    </Box>
  );
};
