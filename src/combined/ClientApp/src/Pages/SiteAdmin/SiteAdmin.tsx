import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState} from "react";
import { EventContext } from "../../App";
import EventEditDeleteForm from "../../components/AdminComponents/EventEditDeleteForm";
import { authService } from "../../services/authService";



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
            
        </Box>
    );
};

export default SiteAdmin;
