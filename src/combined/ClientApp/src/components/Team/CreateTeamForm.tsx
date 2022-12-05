import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import axios from 'axios'
import { Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import { EventContext } from '../../App';
import { Checkbox} from "@mui/material";

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
        isPublic:boolean
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

    return (
        <div className = "FormPageContentPosition">

            <Form onSubmit={createTeamHandler} className="FormBorder">
                <FormGroup>
                    <Row className="FormRowOne">
                        <Col md={6} xs={8}>

                            <Label
                                for="exampleFile"
                                sm={2}
                            >
                            </Label>
                            <Input
                                id="exampleFile"
                                name="file"
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
                <Row className="FormRowTwo">
                    <Col md={6} xs={8}>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Team Name
                            </Label>
                            <Input
                                id="TeamName"
                                name="TeamName"
                                placeholder="Team Name"
                                value={teamName}
                                onChange={event => setTeamName(event.target.value)}
                            />
                        </FormGroup>
                    </Col>

                </Row>
                <FormGroup>
                    <Row className="FormRowThree">

                        <Col md={6} xs={8}>


                            <Label
                                for="exampleText"
                                sm={2}
                            >
                                Team Description
                            </Label>
                            <Input
                                id="exampleText"
                                name="text"
                                type="textarea"
                                value={teamDescription}
                                onChange={event => setTeamDescription(event.target.value)}
                            />

                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row className="FormRowFour">
                        <Col md={6} xs={8}>

                            <Label for="exampleAddress">
                                Donation Goal
                            </Label>
                            <Input
                                id="exampleAddress"
                                name="donationGoal"
                                placeholder="$"
                                type="number"
                                value={donationGoal}
                                onChange={event => setDonationGoal(Number(event.target.value))}
                            />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row className="FormRowFive">
                        <Col md={6} xs={8} className="FormRowFiveColumnPosition">

                            <Label for="exampleAddress">
                                Is This Team Public? 
                            </Label>
                            

                                <Checkbox checked = {isPublic} onChange={() => {
                                    setIsPublic(!isPublic)
                                }}/>



                        </Col>
                    </Row>


                </FormGroup>
                <Col md={12} xs={8} className="FormButtonPosition">

                    <Button variant='contained' className="FormButtonSubmit" type="submit" >Submit</Button>
                </Col>
            </Form>
        </div>

    );
}

export default CreateTeamForm;