import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import { Button } from "@mui/material";
import Team from "../../JsModels/team";

const EditTeam = () => {
    const [searchParams] = useSearchParams();
    const list = []
    for (var entry of searchParams.entries()) {
        list.push(entry[1])
    }
    var tId = parseInt(list[0]);
    if (list[0] !== null) {
        tId = parseInt(list[0]);   // parse the string back to a number.
    }


    const navigate = useNavigate();

    const currentTeamUrl = process.env.PUBLIC_URL + `/api/teams/${tId}`;
    const updateTeamUrl = process.env.PUBLIC_URL + `/api/teams/`;
    const [currentTeam, setCurrentTeam] = useState<Team>();
    const [teamImage, setTeamImage] = useState<any>();
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };
    const baseImageUrl = process.env.PUBLIC_URL + "/api/Asset/";

    const [image, setImage] = useState<File>()

    const isFormInvalid = () => {
        return (
            !currentTeam?.name ||
            !currentTeam?.description ||
            !currentTeam?.WelcomeMessage ||
            currentTeam?.donationTarget === undefined
        );
    };

    useEffect(() => {
        const fetchTeam = async () => {
            const response = await fetch(currentTeamUrl);
            const data = await response.json();
            setCurrentTeam(data);
        };
        

        const callServise = async () => {
            await fetchTeam();
        };
        callServise();
        
    }, [currentTeamUrl]);


    useEffect (() => {
        const fetchTeamImage = async () => {
            var config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
            };
            if (currentTeam?.mainImage) {
                await fetch(process.env.PUBLIC_URL + "/assets/" + currentTeam?.mainImage, {
                    headers: config.headers,
                  
                }).then(async (res) => {
                    const blob = await res.blob();
                    setTeamImage(URL.createObjectURL(blob));
                });
            }
        };
        const callServise = async () => {
            await fetchTeamImage();
        };
        callServise();
    }, [currentTeam?.mainImage])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!image) {
            console.log("no ne wimage selected", currentTeam?.mainImage)
            //currentTeam!.mainImage = teamImage
            await axios.put(updateTeamUrl, currentTeam, config);
            alert("Team information updated successfully!");
            navigate("/TeamsListPage")
        }
        else {

            
            try {
                const data = new FormData();
                data.append('asset', image!, image!.name);
                const imageResponse = await fetch(baseImageUrl, {
                    method: 'POST',
                    body: data,
                    headers: config.headers
                })
                const result = await imageResponse.json()
                currentTeam!.mainImage = result.data
                await axios.put(updateTeamUrl, currentTeam, config);
                alert("Team information updated successfully!");
                navigate("/TeamsListPage")
                
            } catch (error) {
                console.log(error)
                alert("An error occurred while updating the team information.");
            }
        }
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files) {
            const imageFile = e.target.files[0];
            setImage(imageFile);
            setTeamImage(URL.createObjectURL(imageFile));

        }

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
                                    required
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
                               {/* {image ? ( */}
                                    <img
                                        className="team-image-preview"
                                         src={teamImage}
                                        alt="Team Preview"
                                    />
                                {/* ) : null} */}

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
                                    } required
                                />
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
                                    id="WelcomeMessage"
                                    value={currentTeam.WelcomeMessage}
                                    onChange={(event) =>
                                        setCurrentTeam({
                                            ...currentTeam,
                                            WelcomeMessage: event.target.value,
                                        })
                                    } required
                                />
                                <FormText>
                                    You can edit the welcome message for when a user joins your team
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
                                    value={currentTeam.donationTarget}
                                    onChange={(event) => setCurrentTeam({
                                        ...currentTeam,
                                        donationTarget: Number(event.target.value),
                                    })
                                    } required
                                />
                                <FormText>
                                    Current Donation Goal (US Dollars)
                                </FormText>

                            </Col>
                        </Row>
                    </FormGroup>


                    <Button
                        type="submit"
                        disabled={isFormInvalid()}
                        className="FormUpdateSaveButton"
                    >
                        Save
                    </Button>


                </Form>

            ) : (
                "Loading..."
            )}
        </div>
    );

}
export default EditTeam;
