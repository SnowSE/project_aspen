import axios from "axios";
import React, { useEffect, useState} from "react";
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
                const response = await axios.put(api, currentTeam);
                console.log(response);
                alert("Team information updated successfully!");
            } catch (error) {
                console.error(error);
                alert("An error occurred while updating the team information.");
            }      

    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCurrentTeam({
                    ...currentTeam,
                    image: e.target?.result as string,
                });
            };
            reader.readAsDataURL(files[0]);
        }
    };



    return (
        <div>
            {currentTeam ? (

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Team Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={currentTeam.name}
                            onChange={(event) =>
                                setCurrentTeam({
                                    ...currentTeam,
                                    name: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Team Image:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {currentTeam.image && (
                            <img
                                className="team-image-preview"
                                src={currentTeam.image}
                                alt="Team Preview"
                            />
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Team Description:</label>
                        <textarea
                            id="description"
                            value={currentTeam.description}
                            onChange={(event) =>
                                setCurrentTeam({
                                    ...currentTeam,
                                    description: event.target.value,
                                })
                            }
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="donation-goal">Donation Goal:</label>
                        <input
                            type="number"
                            id="donation-goal"
                            value={currentTeam.donationGoal}
                            onChange={(event) =>
                                setCurrentTeam({
                                    ...currentTeam,
                                    donationGoal: parseInt(event.target.value),
                                })
                            }
                        />
                    </div>

                    <button type="submit">Save</button>

                </form>




            ) : (
                "Loading..."
            )}
        </div>
    );

}
export default EditTeam;
