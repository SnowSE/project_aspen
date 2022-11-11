import Button from "@mui/material/Button";
import React, { useState } from "react";
import axios from 'axios'
import { Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";

const CreateTeamForm = () => {

    const [teamName, setTeamName] = useState<string>('')
    const [teamDescription, setTeamDescription] = useState<string>('');
    const [donationGoal, setDonationGoal] = useState<number>(0);  
    const [image, setImage] = useState<string>('')

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };

    interface team {
        name: string, 
        description: string, 
        mainImage: string, 
        ownerID: number, 
        eventID: number, 
        donationTarget: number
    }

    const createTeamHandler = async (event:React.FormEvent) => {
        event.preventDefault()
        
        var currentUserUrl = "https://localhost:44478/aspen/new/api/User"
        var eventsUrl =      "https://localhost:44478/aspen/new/api/events"

        const currentUser = await axios.get(currentUserUrl, config)
        const events = await axios.get(eventsUrl)
        
        let newTeam:team = {
            name: teamName,
            description: teamDescription, 
            mainImage: image, 
            ownerID: Number(currentUser.data.id), 
            eventID: events.data[0].id,
            donationTarget: donationGoal
        }

        var teamUrl = "https://localhost:44478/aspen/new/api/teams"
        const res = await axios.post(teamUrl, newTeam, config)
        .then((response)=> {})
        .catch((error)=> {console.log(error.response.data)})

        setTeamDescription('')
        setTeamName('')
        setDonationGoal(0)
    }




    return (
        <div style={{display:'flex', justifyContent:'center'}}>

        <Form onSubmit = {createTeamHandler} style={{width:'90vw', border:'solid #673ab7', borderRadius:'30px'}}>
            <FormGroup>
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
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
                            onChange={event => setImage(event.target.value)}
                        />
                        <FormText>
                            Select an image that will be displayed as your team's logo
                        </FormText>
                    </Col>
                </Row>
            </FormGroup>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col md={6} xs={8}>
                    <FormGroup>
                        <Label for="exampleEmail">
                            Team Name
                        </Label>
                        <Input
                            id="TeamName"
                            name="TeamName"
                            placeholder="Team Name"
                            value = {teamName}
                            onChange={event => setTeamName(event.target.value)}
                        />
                    </FormGroup>
                </Col>

            </Row>
            <FormGroup>
                <Row style={{ display: 'flex', justifyContent: 'center' }}>

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
                            value ={teamDescription}
                            onChange={event => setTeamDescription(event.target.value)}
                        />

                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col md={6} xs={8}>

                        <Label for="exampleAddress">
                            Donation Goal
                        </Label>
                        <Input
                            id="exampleAddress"
                            name="donationGoal"
                            placeholder="$"
                            type="number"
                            value = {donationGoal}
                            onChange={event => setDonationGoal(Number(event.target.value))}
                        />
                    </Col>
                </Row>
            </FormGroup>
            <Col md={12} xs={8} style={{ display: 'flex', justifyContent: 'center' }}>

                <Button variant='contained' sx={{backgroundColor:'orange'}} type = "submit" >Submit</Button>
            </Col>
        </Form>
        </div>

    );
}

export default CreateTeamForm;