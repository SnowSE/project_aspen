import { Button, TextField, Typography,Input } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { EventContext } from "../../App";
import { authService } from "../../services/authService";


const SiteAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const currentEvent = useContext(EventContext);
    const [updateEventTitle, setupdateEventTitle] = useState<string>(currentEvent.title);

    const updateEventHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        console.log('update got here');
        console.log(updateEventTitle)
    }

    const deleteHandler = async (event: React.FormEvent) => {
        console.log("ready to delete event");
    }
    

    
    useEffect(() => {
        async function currentUser() {
            var user = await authService.getUser()
            console.log("user roles:", user?.profile.roles)
            user?.profile.roles.forEach((role: string) => {
                console.log(role)
                if (role.includes("admin")) {
                    console.log("here")
                    setIsAdmin(true)

                }
                else {
                    setIsAdmin(false)
                }
            });
        }
        currentUser()
    }, [])

    return (
        <div>
            {isAdmin ? 
                <Typography >
                    <form onSubmit={updateEventHandler}>
                        <TextField
                            id="standard-helperText"
                            label="Event Title"
                            defaultValue={updateEventTitle}
                            variant="standard"
                            onChange={(event) => { setupdateEventTitle(event.target.value) } }
                        />
                        <Button
                            variant='contained'
                            sx={{ backgroundColor: 'orange' }}
                            type="submit"
                            >
                            Update
                        </Button>
                    </form>
                    
                </Typography>
            : <h1 data-testid = "NotAdminResult">No</h1>}
            
        </div>
    );
}

export default SiteAdmin;