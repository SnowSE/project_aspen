import { useEffect, useState } from "react";
import Registration from "../../JsModels/registration";

export function JoinTeamRestriction({ id }: any) {

    const [registrations, setRegistrations] = useState<Registration[]>();

    //setID(userId);

    console.log("passed user id:", id);
    var userID = id
    console.log("2nd id", userID);

    const apiUrL = process.env.PUBLIC_URL + `/api/Person/${id}/registrations`;
        useEffect(() => {
        const getRegistrations = async () => {
            console.log("Passed id is", id)
            const res = await fetch(apiUrL)
            const response = await res.json()
            console.log("this is response", response)
            const otherArray = response
            console.log("otherArray", otherArray);
            setRegistrations(otherArray);
        }


        const callServise = async () => {
            await getRegistrations();

        };
        callServise();


    },[apiUrL])      

    return (
        <div>
            <h2>Registrations:{registrations?.map(p => p.teamID)}</h2> 
        </div>)
}