import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import { EventsService } from "../../services/Events/EventsService";
import { authService } from "../../services/authService";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";



const CreateTeamForm = () => {
    // console.log('REACT_APP_BASE_URL', process.env.REACT_APP_BASE_URL)
    // console.log('BASE_URL', process.env.BASE_URL)
    // console.log('PUBLIC_URL', process.env.PUBLIC_URL)
    // console.log('everything', process.env)


    const navigate = useNavigate()

    const [teamName, setTeamName] = useState<string>('')
    const [teamDescription, setTeamDescription] = useState<string>('');
    const [donationGoal, setDonationGoal] = useState<number>(0);
    const [image, setImage] = useState<string>('')
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true)


    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

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


    const createTeamHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        var currentUserUrl = process.env.REACT_APP_BASE_URL + "/api/User"
        var eventsUrl = process.env.REACT_APP_BASE_URL + "/api/events"
        const currentUser = await axios.get(currentUserUrl, config)
        const keycloakUser = await authService.getUser();
        const events = await EventsService.GetEventsViaAxios()

        


        let newTeam: team = {
            name: teamName,
            description: teamDescription,
            mainImage: image,
            ownerID: Number(currentUser.data.id),
            eventID: events[0].id!,
            donationTarget: donationGoal!
        }


        
        var teamUrl = process.env.REACT_APP_BASE_URL + "/api/teams"

        const res = await axios.post(teamUrl, newTeam, config)
            .then((response) => { })
            .catch((error) => { console.log(error.response.data) })

        setTeamDescription('')
        setTeamName('')

        navigate("/TeamsListPage")
    }

    useEffect(()=> {
        if (teamName.trim().length != 0 && teamDescription.trim().length != 0 && donationGoal! > 0) {
            setDisableSubmit(false)
        }
        else {
            setDisableSubmit(true)
        }
async function currentUser() {
            var user = await authService.getUser()
            if (user == null){
                setIsLoggedIn(false)
            }
            else{
                setIsLoggedIn(true)
            }
        }
        currentUser()
    }, [teamName, teamDescription, donationGoal])





    return (
        <div style={{display:'flex', justifyContent:'center'}}>

        {isLoggedIn ? <Form onSubmit = {createTeamHandler} style={{width:'90vw', border:'solid #673ab7', borderRadius:'30px'}}>
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
                                value={teamName}
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
                                name="teamDescription"
                                type="textarea"
                                placeholder="Team Description"
                                value={teamDescription}
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
                                value={donationGoal}
                                onChange={event => setDonationGoal(Number(event.target.value))}
                            />

                        </Col>
                    </Row>
                </FormGroup>
                <Col md={12} xs={8} style={{ display: 'flex', justifyContent: 'center' }}>

                    <Button 
                        variant='contained' 
                        disabled = {disableSubmit} 
                        sx={{ backgroundColor: 'orange' }} 
                        type="submit" 
                        onClick={() => navigate('/TeamsListPage')}>
                            Submit
                    </Button> 

                </Col>
            </Form>
                        
        : <h1>Not logged in</h1> }
        </div>

    );
}

export default CreateTeamForm;