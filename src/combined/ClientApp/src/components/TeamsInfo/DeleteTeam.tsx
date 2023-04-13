import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DeleteTeam = () => {
    const [searchParams] = useSearchParams();
    const list = []
    for (var entry of searchParams.entries()) {
        list.push(entry[1])
    }
    var tId = parseInt(list[0]);
    if (list[0] !== null) {
        tId = parseInt(list[0]);   // parse the string back to a number.
    }
   


    const api = process.env.PUBLIC_URL + `/api/teams/${tId}`;
    const [currentTeam, setCurrentTeam] = useState<any>();
    useEffect(() => {
        const fetchTeam = async () => {
            const response = await fetch(api);
            const data = await response.json();
            setCurrentTeam(data);
        };

        const callServise = async () => {
            await fetchTeam();
        };
        callServise();

    }, [api]);



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.delete(api, currentTeam);
            console.log(response);
            alert("Team information updated successfully!");
        } catch (error) {
            console.error(error);
            alert("An error occurred while updating the team information.");
        }

    };



    return (
        <div>
            {currentTeam ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Team Name:
                        <input
                            type="text"
                            value={currentTeam.name}
                            onChange={(event) =>
                                setCurrentTeam({ ...currentTeam, name: event.target.value })
                            }
                        />
                    </label>
                    {/* Add other fields to display and edit the team information */}
                    <button type="submit">Delete</button>
                </form>
            ) : (
                "Loading..."
            )}
        </div>
    );

}
export default DeleteTeam;

