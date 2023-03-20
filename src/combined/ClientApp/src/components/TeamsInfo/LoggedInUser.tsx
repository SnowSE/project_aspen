import { Button, Typography,} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { EventContext } from "../../App";
import DynamicModal from "../DynamicModal";
import Team from "../../JsModels/team";

export function LoggedInUser() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [nickName, setNickName] = useState<string>('Anonymous');
    const [teamID, setTeamID] = useState<number>(-1);
    const [personID, setPersonID] = useState<number>(-1);
    const { currentEvent } = useContext(EventContext);
    const [loggedInUserId, setLoggedInUserId] = useState<number>();
    const [isTeamOwner, setIsTeamOwner] = useState<boolean>(false);
    
    const [openModal, setOpenModal] = useState(false);
    const [isOkModal, setIsOkModal] = useState(false);
    const [message, setMessage] = useState("");

    const addTeamMemberHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        const now = new Date();
        const utcDate = now.toISOString();
        const personTeam = { personId: personID, teamId: teamID, eventId: currentEvent.id, DateJoined: utcDate }
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };

        if (searchParams.get("canSwitchTeams") === "true" && isTeamOwner === false) {
            try {
                await axios.delete(process.env.PUBLIC_URL + `/api/PersonTeamAssociation/${loggedInUserId}/${currentEvent.id}`);
                const result = await axios.post(process.env.PUBLIC_URL + "/api/PersonTeamAssociation", personTeam);
                if (result.status === 200) {
                    var personResult = await axios.get(process.env.PUBLIC_URL + "/api/Person/" + personID, config);
                    var teamResult = await axios.get(process.env.PUBLIC_URL + "/api/teams/" + teamID, config);
                    var person = personResult.data;
                    var team = teamResult.data;
                    var updatePerson = { ...person, nickname: nickName };
                    await axios.put(process.env.PUBLIC_URL + "/api/Person/", updatePerson, config);
                        setIsOkModal(true)
                        setMessage(team.welcomeMessage)
                        setOpenModal(true)
                }
            } catch (e) {
                alert(`Could not switch123 to the team, please try again later  ${e}`);
            }
        }

        else {
            try {
                const result = await axios.post(process.env.PUBLIC_URL + "/api/PersonTeamAssociation", personTeam);
                if (result.status === 200) {
               
                    personResult = await axios.get(process.env.PUBLIC_URL + "/api/Person/" + personID, config);
                    teamResult = await axios.get(process.env.PUBLIC_URL + "/api/teams/" + teamID, config);
                    person = personResult.data;
                    team = teamResult.data;
                    updatePerson = { ...person, nickname: nickName };
                    await axios.put(process.env.PUBLIC_URL + "/api/Person/", updatePerson, config);
                        setIsOkModal(true)
                        setMessage(team.welcomeMessage)
                        setOpenModal(true)
                }
            } catch (e) {
                alert("Could not add you to the team, please try again later ");
            }
        }
    }

    const closeModal = () => {
        setOpenModal(false)
        setIsOkModal(false)
        setMessage("")
        navigate(`/TeamDetails?teamId=${teamID}`);
    }

    const handleChange = (e: any) => {
        setNickName(e.target.value);

    };

    if (!nickName) {
        <Typography>Anonymous</Typography>
    }
    else {
        <Typography>{nickName}</Typography>
    }
    useEffect(() => {
        const checkAllTeams = async () => {
            var teams = await axios.get(process.env.PUBLIC_URL + `/api/teams/event/${currentEvent.id}`, config)
            teams.data.forEach((team: Team) => {
                if (team.ownerID === loggedInUserId) {
                    console.log("This user is a team owner and cannot switch teams")
                    setIsTeamOwner(true)
                }
            });
        }
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };
        const getUser = async () => {
            await axios.get(process.env.PUBLIC_URL + '/api/user', config).then((response) => {
                setLoggedInUserId(response?.data?.id)
            }).catch((error) => {
                console.log("There was an error retrieving user", error)
            })
        }
        const list = [];
        for (const entry of searchParams.entries()) {
            list.push(entry[1]);
        }
        const [teamID, personID] = list.map(Number);
        checkAllTeams();
        setTeamID(teamID);
        setPersonID(personID);
        getUser()
    }, [searchParams, currentEvent, loggedInUserId]);



    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' sx={{ backgroundColor: 'orange', m: 2 }} onClick={() => navigate(-1)}>Back</Button>
            <Form onSubmit={addTeamMemberHandler} style={{ width: '90vw', border: 'solid #673ab7', borderRadius: '30px' }}>
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col md={6} xs={8}>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Please enter the name you want to have displayed when you join the team. If left blank or you would like to remain anonymous, leave your name blank.
                            </Label>
                            <Input
                                id="nickName"
                                name="nickName"
                                placeholder="Enter your name"
                                value={nickName}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Col md={12} xs={8} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant='contained' sx={{ backgroundColor: 'orange' }} onClick={addTeamMemberHandler}>Submit</Button>
                </Col>
                <DynamicModal
                    open={openModal}
                    close={closeModal}
                    message={message}
                    onConfirm={closeModal}
                    isOkConfirm={isOkModal}
                 />
            </Form>
        </div>);
}
