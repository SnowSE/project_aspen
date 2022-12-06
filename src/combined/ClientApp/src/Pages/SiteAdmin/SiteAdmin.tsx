import { Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { EventContext } from "../../App";
import { authService } from "../../services/authService";



const SiteAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const currentEvent = useContext(EventContext);
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
                    {currentEvent?.title}
                    {currentEvent?.description}
                    {currentEvent?.Date}
                </Typography>
            : <h1 data-testid = "NotAdminResult">No</h1>}
            
        </div>
    );
}

export default SiteAdmin;