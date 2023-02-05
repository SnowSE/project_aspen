import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateTeamForm = () => {
    const [teamName, setTeamName] = useState("");
    const [teamDescription, setTeamDescription] = useState("");
    const [teamGoal, setTeamGoal] = useState('');
    const [teamImage, setTeamImage] = useState<File | null>(null);

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log("Team Name:", teamName);
        console.log("Team Description:", teamDescription);
        console.log("Team Goal:", teamGoal);
        console.log("Team Image:", teamImage);
    };

    const handleTeamDescriptionChange = (value:any) => {
        setTeamDescription(value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="team-name">Team Name:</label>
                <ReactQuill
                    id="team-name"
                    value={teamName}
                    //onChange={(event) => setTeamName(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="team-description">Team Description:</label>
                <ReactQuill
                    id="team-description"
                    value={teamDescription}
                    onChange={handleTeamDescriptionChange}
                />
            </div>
            <div>
                <label htmlFor="team-goal">Team Goal:</label>
                <input
                    type="number"
                    id="team-goal"
                    value={teamGoal}
                    onChange={(event) => setTeamGoal(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="team-image">Team Image:</label>
                <input
                    type="file"
                    id="team-image"
                    //onChange={(event) => setTeamImage(event.target.files[0] as File)}
                />
            </div>
            <button type="submit">Create Team</button>
        </form>
    );
};

export default CreateTeamForm;
