import { Accordion, AccordionSummary, Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState} from "react";
import { EventContext } from "../../App";
import EventEditDeleteForm from "../../components/AdminComponents/EventEditDeleteForm";
import TeamMembersListAccordian from "../../components/AdminComponents/TeamMembersListAccordian";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const SiteAdmin = () => {
    const { currentEvent } = useContext(EventContext);
    
    const [showEditEvent, setShowEditEvent] = useState(true);
    useEffect(() => {
    }, [currentEvent]);

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
