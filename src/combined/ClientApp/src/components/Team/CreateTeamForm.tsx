import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import { EventContext } from '../../App';
import { Checkbox } from "@mui/material";

const CreateTeamForm = () => {    
    const [teamName, setTeamName] = useState<string>('')
    const [teamDescription, setTeamDescription] = useState<string>('');
    const [donationGoal, setDonationGoal] = useState<number>(0);
    const [image, setImage] = useState<File>()
    const [isPublic, setIsPublic] = useState<boolean>(false)
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true)

    const currentEvent = useContext(EventContext);

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };

    interface team {
        name: string,
        description: string,
        mainImage: string,
        ownerID: number,
        eventID: number,
        donationTarget: number,
        isPublic: boolean
    }

    const createTeamHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        console.log(process.env.PUBLIC_URL)
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
        console.log('upload result:', result)

        const currentUser = await axios.get(currentUserUrl, config)

        let newTeam: team = {
            name: teamName,
            description: teamDescription,
            mainImage: result.data,
            ownerID: Number(currentUser.data.id),
            eventID: currentEvent.id,
            donationTarget: donationGoal,
            isPublic: isPublic
        }

        var teamUrl = process.env.PUBLIC_URL + "/api/teams"
        await axios.post(teamUrl, newTeam, config)
            .then((response) => { })
            .catch((error) => { console.log(error.response.data) })

        setTeamDescription('')
        setTeamName('')
        setDonationGoal(0)

        var allEvents = await fetch(`${process.env.PUBLIC_URL}/api/events${currentEvent.id}`)
        var allEventsJson = await allEvents.json();
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
        <div className = "FormPageContentPosition">

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
                                data-testid = "teamNameInput"
                                onChange={event => setTeamName(event.target.value)}
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
                                data-testid = "teamDescriptionInput"
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
                                data-testid = "teamDonationGoalInput"
                                onChange={event => setDonationGoal(Number(event.target.value))}
                            />
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup>
                    <Row className="FormRowFive">
                        <Col md={6} xs={8} className="FormRowFiveColumnPosition">

                            <Label>
                                Is This Team Public?
                            </Label>

                            <Checkbox checked={isPublic} onChange={() => {
                                setIsPublic(!isPublic)
                            }} />
                        </Col>
                    </Row>
                </FormGroup>

                <Col md={12} xs={8} className="FormButtonPosition">

                    <Button variant='contained' disabled={disableSubmit} sx={{ backgroundColor: 'orange' }} type="submit" >Submit</Button>
                </Col>
            </Form>
        </div>

    );
}

export default CreateTeamForm;