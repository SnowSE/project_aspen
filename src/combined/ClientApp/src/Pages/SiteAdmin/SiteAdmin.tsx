import { Accordion, AccordionSummary, Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState} from "react";
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
            <Box>
                {
                    showEditEvent === true ? <Typography>{currentEvent?.title}</Typography> : <EventEditDeleteForm />
                }
                <Button type='button' variant='contained' onClick={() => setShowEditEvent((prevState) => !prevState)}>
                    {
                        showEditEvent === true ? "Edit" : "Close"
                    }
                </Button>
            </Box>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/> }
                >
                    <Typography> Teams </Typography>
                </AccordionSummary>
            {teamsList?.map((t: any, id) => {
                return (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography>
                                    {t.name}
                                </Typography>
                            </AccordionSummary>
                            <TeamMembersListAccordian />
                        </Accordion>
               )})}
            </Accordion>
            
        </Box>
        
    );
};

export default SiteAdmin;
