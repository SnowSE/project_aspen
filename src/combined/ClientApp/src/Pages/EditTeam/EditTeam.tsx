import axios from "axios";
import React, { useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import { Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";

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
    const [tempImage, setTempImage] = useState<string>("");
    const [teamImage, setTeamImage] = useState<File | undefined>(undefined);
    const [donationGoal, setDonationGoal] = useState<number>(0);


    const baseImageUrl = process.env.PUBLIC_URL + "/assets/";

    const [imageUrl, setImageUrl] = useState<string>(baseImageUrl + currentTeam?.mainImage);

    useEffect(() => {
        const fetchTeam = async () => {
            const response = await fetch(api);
            const data = await response.json();
            setCurrentTeam(data);
            setTeamImage(data.mainImage);
            setDonationGoal(data.donationGoal);
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

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setTempImage(e.target?.result as string);
                setImageUrl(e.target?.result as string);
                setCurrentTeam({
                    ...currentTeam,
                    mainImage: files[0],
                    image: e.target?.result as string,
                });
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleDonationGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setDonationGoal(value);
    };



    return (
        <div>
            {currentTeam ? (

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Row className="FormRowOne">
                            <Col md={5} xs={6}>
                                <Label>
                                    Team Name
                                </Label>
                                <Input
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
                            </Col>
                        </Row>
                    </FormGroup> 
                    <FormGroup>
                        <Row className="FormRowOne">
                            <Col md={6} xs={8}>
                                <Label>
                                </Label>
                                <Input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {imageUrl ? (
                                    <img
                                        className="team-image-preview"
                                        src={imageUrl}
                                        alt="Team Preview"
                                    />
                                ) : null}
                                
                                <FormText>
                                    You can change the team image in here
                                </FormText>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row className="FormRowOne">
                            <Col md={6} xs={8}>
                                <Label>
                                </Label>
                                <Input
                                    id="description"
                                    value={currentTeam.description}
                                    onChange={(event) =>
                                        setCurrentTeam({
                                            ...currentTeam,
                                            description: event.target.value,
                                        })
                                    }/>
                                <FormText>
                                    You can edit the team description
                                </FormText>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row className="FormRowOne">
                            <Col md={6} xs={8}>
                                <Label>
                                </Label>
                                <Input
                                    type="number"
                                    id="donation-goal"
                                    value={currentTeam.donationGoal}
                                    onChange={(event) => setDonationGoal(parseInt(event.target.value))}
                                />
                                <FormText>
                                    Current donation goal: ${donationGoal}
                                </FormText>
                                
                            </Col>
                        </Row>
                    </FormGroup>

                    
                    <button type="submit">Save</button>

                </Form>

            ) : (
                "Loading..."
            )}
        </div>
    );

}
export default EditTeam;
