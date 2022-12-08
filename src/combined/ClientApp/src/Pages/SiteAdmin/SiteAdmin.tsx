import { Accordion, AccordionSummary, Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState} from "react";
import { EventContext } from "../../App";
import EventEditDeleteForm from "../../components/AdminComponents/EventEditDeleteForm";
import TeamMembersListAccordian from "../../components/AdminComponents/TeamMembersListAccordian";
import { authService } from "../../services/authService";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const SiteAdmin = () => {
    const [, setIsAdmin] = useState(false);
    const [showEditEvent, setShowEditEvent] = useState(true);
    const { currentEvent } = useContext(EventContext);
    useEffect(() => {
    }, [currentEvent]);

    useEffect(() => {
        async function currentUser() {
            var user = await authService.getUser();
            console.log("user roles:", user?.profile.roles);
            user?.profile.roles.forEach((role: string) => {
                console.log(role);
                if (role.includes("admin")) {
                    console.log("here");
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            });
        }
        currentUser();
    }, []);

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
            <Box sx={{ pt: '4rem' }} >
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>
                            Example Non-dynamic Team name
                        </Typography>
                    </AccordionSummary>
                    <TeamMembersListAccordian />
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>
                            Example Non-dynamic Team name2
                        </Typography>
                    </AccordionSummary>
                    <TeamMembersListAccordian />
                </Accordion>
            </Box>
            
        </Box>
    );
};

export default SiteAdmin;
