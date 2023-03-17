import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import { EventContext } from '../../App';
import { useNavigate } from "react-router-dom";
import team from "../../JsModels/team";


const CreateTeamForm = () => {

    const navigate = useNavigate();

    const [teamName, setTeamName] = useState<string>('')
    const [teamWelcomeMessage, setTeamWelcomeMessage] = useState<string>('')
    const [teamDescription, setTeamDescription] = useState<string>('');
    const [donationGoal, setDonationGoal] = useState<number>(0);
    const [image, setImage] = useState<File>()
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true)

    const { currentEvent } = useContext(EventContext);

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };

    const createTeamHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        var currentUserUrl = process.env.PUBLIC_URL + "/api/User"
        var assetsUrl = process.env.PUBLIC_URL + "/api/asset"

        if (!image) {
            return
        }

        const data = new FormData();
        data.append('asset', image, image.name);
        const imageResponse = await fetch(assetsUrl, {
            method: 'POST',
            body: data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })

        const result = await imageResponse.json()
        const currentUser = await axios.get(currentUserUrl, config)

        let newTeam: team = {
            name: teamName,
            //welcomeMessage: teamWelcomeMessage,
            description: teamDescription,
            mainImage: result.data,
            ownerID: Number(currentUser.data.id),
            eventID: currentEvent.id,
            isArchived: false,
            donationTarget: donationGoal
        }
        var teamID: number = 0;
        var teamUrl = process.env.PUBLIC_URL + "/api/teams"
        await axios.post(teamUrl, newTeam, config)
            .then((response) => { teamID = response.data.id })
            .catch((error) => { console.log(error.response.data) })

        navigate(`/TeamDetails?id=${teamID}`)

    }

    const imageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    }


    useEffect(() => {
        if (teamName.trim().length !== 0 && teamDescription.trim().length !== 0 && donationGoal! > 0) {
            setDisableSubmit(false)
        }
        else {
            setDisableSubmit(true)
        }
    }, [teamName, teamDescription, donationGoal])



    return (
        <div className="FormPageContentPosition">

            <Form onSubmit={createTeamHandler} className="FormBorder">
                <FormGroup>
                    <Row className="FormRowOne">
                        <Col md={6} xs={8}>

                            <Label>
                            </Label>
                            <Input
                                type="file"
                                placeholder="Team Logo"
                                onChange={imageOnChange}
                            />
                            <FormText>
                                Select an image that will be displayed as your team's logo
                            </FormText>
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup>
                    <Row className="FormRowTwo">
                        <Col md={6} xs={8}>
                            <Label>
                                Team Name
                            </Label>
                            <Input
                                placeholder="Team Name"
                                value={teamName}
                                data-testid="teamNameInput"
                                onChange={event => setTeamName(event.target.value)}
                            />
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup>
                    <Row className="FormRowThree">
                        <Col md={6} xs={8}>
                            <Label>
                                Team Welcome Message
                            </Label>
                            <Input
                                type="textarea"
                                value={teamWelcomeMessage}
                                data-testid="teamWelcomeMessage"
                                onChange={event => setTeamWelcomeMessage(event.target.value)}
                            />
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup>
                    <Row className="FormRowThree">
                        <Col md={6} xs={8}>
                            <Label>
                                Team Description
                            </Label>
                            <Input
                                type="textarea"
                                value={teamDescription}
                                data-testid="teamDescriptionInput"
                                onChange={event => setTeamDescription(event.target.value)}
                            />
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup>
                    <Row className="FormRowFour">
                        <Col md={6} xs={8}>
                            <Label>
                                Donation Goal
                            </Label>
                            <Input
                                type="number"
                                value={donationGoal}
                                data-testid="teamDonationGoalInput"
                                onChange={event => setDonationGoal(Number(event.target.value))}
                            />
                        </Col>
                    </Row>
                </FormGroup>
                <Col md={12} xs={8} className="FormButtonPosition">
                    <Button
                        variant='contained'
                        disabled={disableSubmit}
                        sx={{ backgroundColor: 'orange' }}
                        type="submit"
                        onClick={createTeamHandler}>
                        Submit
                    </Button>
                </Col>
            </Form>
        </div>

    );
}

export default CreateTeamForm;