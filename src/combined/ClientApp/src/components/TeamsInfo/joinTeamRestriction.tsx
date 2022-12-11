import axios from "axios";
import {  useContext, useEffect, useState } from "react";
import Registration from "../../JsModels/registration";
import { getRegistrationList } from "./RegistrationService";
import { getUserTeamID } from "./TeamRegistration";

export function JoinTeamRestriction() {

    const [registrations, setRegistrations] = useState<Registration[]>();

    var currentUserUrl = process.env.PUBLIC_URL + "/api/User"
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };
    useEffect(() => {   
        const getRegistrations = async () => {

            const user = await axios.get(currentUserUrl, config)
            console.log("I am the current user", typeof (user.data.id));

            const curUser = Number(user.data.id)
            const regs = await getRegistrationList(curUser);
            setRegistrations(regs)

            
        }
        const callServise = async () => {
            await getRegistrations();
        };
        callServise();
    }, [currentUserUrl])

    const teamId = () => {
        const tId:any = registrations?.map(p => p.teamID)
        getUserTeamID(tId);
    }
    teamId();
    return (
        <div>
            {registrations?.map(p => p.teamID)}
            {/*{registrations?.map(r => {*/}
            {/*    if (typeof (r.teamID)! == 'undefined' || r.teamID !== null) {*/}
            {/*        return "True"*/}
            {/*    }*/}
            {/*    else { return "False" };*/}
            {/*})}*/}

        </div>)     
}