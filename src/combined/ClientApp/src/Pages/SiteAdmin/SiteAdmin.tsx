import { Accordion, AccordionSummary, Box, Button, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { EventContext } from "../../App";
import EventEditDeleteForm from "../../components/AdminComponents/EventEditDeleteForm";
import TeamMembersListAccordian from "../../components/AdminComponents/TeamMembersListAccordian";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getTeamsList } from "../../components/TeamsInfo/TeamServices";
import Team from "../../JsModels/team";



const SiteAdmin = () => {
    const { currentEvent } = useContext(EventContext);
    const [teamsList, setTeams] = useState<Team[]>();
    const [showEditEvent, setShowEditEvent] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!currentEvent.id) {
                console.log("No current event found!")
                return;
            }
            var teamsList = await getTeamsList(currentEvent.id)
            var jsonTeams: Team[] = JSON.parse(JSON.stringify(teamsList));
            setTeams(jsonTeams)
        }
        fetchData()
    }, [currentEvent])

    return (

        <Box>
            <Paper square={true} elevation={6} className="AdminPaperDetails">
                <Box className="AdminCurrentEventDetails">
                    {
                        showEditEvent === true ? <Typography className="AdminCurrentEventTextDetails"> Current Event: {currentEvent?.title}</Typography> : <EventEditDeleteForm />
                    }
                    <Button type='button' variant='contained' className="AdminButtonDetails" onClick={() => setShowEditEvent((prevState) => !prevState)}>
                        {
                            showEditEvent === true ? "Edit" : "Close"
                        }
                    </Button>
                </Box>
            </Paper>
            <Accordion className="AccordionSpacing">
                <AccordionSummary
                    className="AccordionDetails"
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography> Teams </Typography>
                </AccordionSummary>
                {teamsList?.map((t: any, id) => {
                    return (
                        <Accordion className="InnerAccordionSpacing">
                            <AccordionSummary
                                className="InnerAccordionDetails"
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography>
                                    {t.name}
                                </Typography>
                                <Box className="TeamsSpacing">
                                    <Button
                                        variant="contained"
                                        className="UpdateTeamButtonDetails"
                                        type="submit"
                                    >Update
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className="DeleteTeamButtonDetails"
                                        type="button"
                                    > Delete
                                    </Button>
                                </Box>
                            </AccordionSummary>
                            <TeamMembersListAccordian />
                        </Accordion>
                    )
                })}
            </Accordion>
        </Box>

    );
};

export default SiteAdmin;
