import { Button, Typography,} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col, Form, FormGroup, Input, Label, Row, FormText } from "reactstrap";
import { EventContext } from "../../App";
import DynamicModal from "../DynamicModal";
import Team from "../../JsModels/team";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


export function LoggedInUser() {

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
    const api = process.env.PUBLIC_URL + `/api/teams/${tId}`;
    const [currentTeam, setCurrentTeam] = useState<any>();
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
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };
        const checkAllTeams = async () => {
            var teams = await axios.get(process.env.PUBLIC_URL + `/api/teams/event/${currentEvent.id}`, config)
            teams.data.forEach((team: Team) => {
                if (team.ownerID === loggedInUserId) {
                    console.log("This user is a team owner and cannot switch teams")
                    setIsTeamOwner(true)
                }
            });
        }
        const fetchTeam = async () => {
            const res = await fetch(api)
            const response = await res.json()
            setCurrentTeam(response)
        }
        const getUser = async () => {
            await axios.get(process.env.PUBLIC_URL + '/api/user', config).then((response) => {
                setLoggedInUserId(response?.data?.id)
            }).catch((error) => {
                console.log("There was an error retrieving user", error)
            })
        }

        const callServise = async () => {
            await fetchTeam();
        };

        callServise();
       

        const list = [];
        for (const entry of searchParams.entries()) {
            list.push(entry[1]);
        }
        const [teamID, personID] = list.map(Number);
        checkAllTeams();
        setTeamID(teamID);
        setPersonID(personID);
        getUser()
      
    }, [searchParams, currentEvent, loggedInUserId, api]);



    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
                onClick={() => navigate(-1)}
            >
                <KeyboardBackspaceIcon className="BackToTeamsListButton" />
            </Button>
            <Form onSubmit={addTeamMemberHandler} style={{ width: '90vw', border: 'solid #673ab7', borderRadius: '30px' }}>
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col md={6} xs={8}>
                        <FormGroup>
                            <Label for="exampleEmail">
                            Before joining team: <b>{currentTeam?.name}</b>, kindly provide your desired name to be used within the team. In case you prefer to keep your identity anonymous, you can simply click submit without making any changes.

                            </Label>
                            <Input
                                id="nickName"
                                name="nickName"
                                placeholder="Ex: Steven1234"
                                value={nickName}
                                onChange={handleChange}
                                helperText="This is a test"
                            />
                            <FormText>
                                This name will be used on the member list on {currentTeam?.name}
                            </FormText>
                        </FormGroup>
                    </Col>
                </Row>
                <Col md={12} xs={8} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant='contained' className="NickNameSubmitButton" onClick={addTeamMemberHandler}>Submit</Button>
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
