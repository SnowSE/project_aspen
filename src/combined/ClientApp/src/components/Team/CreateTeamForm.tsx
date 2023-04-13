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
    const [isOnActiveTeam, setIsOnActiveTeam] = useState<boolean>(false)
    const [loggedInUserId, setLoggedInUserId] = useState<number>();

    const { currentEvent } = useContext(EventContext);

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };

    const createTeamHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        if(isOnActiveTeam)
        {
            deleteLoggedInPersonRecord()
        }
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
            WelcomeMessage: teamWelcomeMessage,
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
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };
        if (teamName.trim().length !== 0 && teamDescription.trim().length !== 0 && donationGoal! > 0) {
            setDisableSubmit(false)
        }
        else {
            setDisableSubmit(true)
        }
        const getUser = async () => {
            await axios.get(process.env.PUBLIC_URL + '/api/user', config).then((response) => {
                setLoggedInUserId(response?.data?.id)
            }).catch((error) => {
                console.log("There was an error retrieving user", error)
            })

        }
        const checkIfOnTeam = async () => {
            try {
                var res = await axios.get(process.env.PUBLIC_URL + `/api/PersonTeamAssociation/${loggedInUserId}/${currentEvent?.id}`)
                if (res.status === 200) {
                    setIsOnActiveTeam(true)
                }
            }
            catch (e) {
            }
        }
        const callServise = async () => {
            await getUser();
            await checkIfOnTeam();
        };

        callServise();
    }, [teamName, teamDescription, donationGoal, currentEvent?.id, loggedInUserId])

    const deleteLoggedInPersonRecord = async () => {
        const deleteUser = process.env.PUBLIC_URL + `/api/PersonTeamAssociation/${loggedInUserId}/${currentEvent?.id}`;
        await axios.delete(deleteUser, config);
    }

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
                                Select an image that will be displayed as your team's logo. This will be used as the main image on the team page.
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
                                placeholder="Ex: Power Rangers V World Hunger"
                                value={teamName}
                                data-testid="teamNameInput"
                                onChange={event => setTeamName(event.target.value)}
                            />
                            <FormText>
                                This will be used as the title of your team page, the active teams page, and used in the description when someone joins your team.
                            </FormText>
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup>
                    <Row className="FormRowThree">
                        <Col md={6} xs={8}>
                            <Label>
                                {`Team Welcome Message (Type in a message here that you want people who join your team to see.)`} 
                            </Label>
                            <Input
                                type="textarea"
                                placeholder="Ex: Thank you for joining Power Rangers. I, the red ranger, will lead us to victory against hunger and with your help we will supply $500 to end this war."
                                value={teamWelcomeMessage}
                                data-testid="teamWelcomeMessage"
                                onChange={event => setTeamWelcomeMessage(event.target.value)}
                            />
                            <FormText>
                                This will be used when a member joins your team
                            </FormText>
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
                                placeholder="Ex: Join as your favorite power ranger color and together we will end world hunger."
                                value={teamDescription}
                                data-testid="teamDescriptionInput"
                                onChange={event => setTeamDescription(event.target.value)}
                            />
                            <FormText>
                                This will be used on your team page
                            </FormText>
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup>
                    <Row className="FormRowFour">
                        <Col md={6} xs={8}>
                            <Label>
                                {`Donation Goal (US Dollars)`}
                            </Label>
                            <Input
                                type="number"
                                value={donationGoal}
                                data-testid="teamDonationGoalInput"
                                onChange={event => setDonationGoal(Number(event.target.value))}
                            />
                            <FormText>
                                This will be used on your team page
                            </FormText>
                        </Col>
                    </Row>
                </FormGroup>
                <Col md={12} xs={8} className="FormButtonPosition">
                    <Button
                        variant='contained'
                        disabled={disableSubmit}
                        className="FormButtonSubmit"
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