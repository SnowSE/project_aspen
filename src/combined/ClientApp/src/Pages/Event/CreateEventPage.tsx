import { useEffect, useState } from "react";
import CreateEventForm from "../../components/Event/CreateEventForm";
import { authService } from "../../services/authService";



const CreateEventPage = () => {
    const [isAdmin, setIsAdmin] = useState(false)


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
            {isAdmin ? <CreateEventForm/>: <h1>No</h1>}
        </div>
    );
}

export default CreateEventPage;