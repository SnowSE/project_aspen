import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import { EventContext } from '../../App';
import { Checkbox } from "@mui/material";

const CreateTeamForm = () => {
    console.log('REACT_APP_BASE_URL', process.env.REACT_APP_BASE_URL)
    console.log('BASE_URL', process.env.BASE_URL)
    console.log('PUBLIC_URL', process.env.PUBLIC_URL)
    console.log('everything', process.env)

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
        console.log(process.env.REACT_APP_BASE_URL)
        var currentUserUrl = process.env.REACT_APP_BASE_URL + "/api/User"
        var assetsUrl = process.env.REACT_APP_BASE_URL + "/api/asset"

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

        var teamUrl = process.env.REACT_APP_BASE_URL + "/api/teams"
        await axios.post(teamUrl, newTeam, config)
            .then((response) => { })
            .catch((error) => { console.log(error.response.data) })

        setTeamDescription('')
        setTeamName('')
        setDonationGoal(0)
    }

    const imageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    }


    useEffect(() => {
        if (teamName.trim().length != 0 && teamDescription.trim().length != 0 && donationGoal! > 0) {
            setDisableSubmit(false)
        }
        else {
            setDisableSubmit(true)
        }
    }, [teamName, teamDescription, donationGoal])



    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>

            <Form onSubmit={createTeamHandler} style={{ width: '90vw', border: 'solid #673ab7', borderRadius: '30px' }}>
                <FormGroup>
                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
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
                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
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
                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
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
                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
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
                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                        <Col md={6} xs={8} style={{ display: 'flex', justifyContent: 'center' }}>

                            <Label>
                                Is This Team Public?
                            </Label>

                            <Checkbox checked={isPublic} onChange={() => {
                                setIsPublic(!isPublic)
                            }} />
                        </Col>
                    </Row>
                </FormGroup>

                <Col md={12} xs={8} style={{ display: 'flex', justifyContent: 'center' }}>

                    <Button variant='contained' disabled={disableSubmit} sx={{ backgroundColor: 'orange' }} type="submit" >Submit</Button>
                </Col>
            </Form>
        </div>

    );
}

export default CreateTeamForm;