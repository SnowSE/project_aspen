import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";

const EditTeam = () => {
    const [searchParams] = useSearchParams();
    const list = []
    for (var entry of searchParams.entries()) {
        console.log(entry[1]);
        list.push(entry[1])
    }
    var tId = parseInt(list[0]);
    if (list[0] !== null) {
        tId = parseInt(list[0]);   // parse the string back to a number.
    }
    var ownerId = parseInt(list[1]);
    if (list[1] !== null) {
        ownerId = parseInt(list[1]);   // parse the string back to a number.
    }


    const api = process.env.PUBLIC_URL + `/api/teams/${tId}`;
    const [currentTeam, setCurrentTeam] = useState<any>();
   
    return (
        <div>
            "I am in Edit team page"
        </div>
    );
}
export default EditTeam;
