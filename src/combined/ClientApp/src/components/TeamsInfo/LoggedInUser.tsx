import { Button, Typography} from "@mui/material";
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
    
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isOkModal, setIsOkModal] = useState(false);
    const [message, setMessage] = useState("");

    const handleClose = () => setOpen(false);
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };

    const addTeamMemberHandler = async (event: React.FormEvent) => {
        console.log("Got to the start here") //This isnt working on the yes of the moadl click need to figure out why
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
                    var person = personResult.data;
                    var updatePerson = { ...person, nickname: nickName };
                    await axios.put(process.env.PUBLIC_URL + "/api/Person/", updatePerson, config);
                    alert("You have successfully switched teams!");
                    navigate(`/TeamDetails?teamId=${teamID}`);
                }
            } catch (e) {
                alert("Could not add you to the team, please try again later ");
            }
        }

        else {
            try {
                const result = await axios.post(process.env.PUBLIC_URL + "/api/PersonTeamAssociation", personTeam);
                if (result.status === 200) {
               
                    personResult = await axios.get(process.env.PUBLIC_URL + "/api/Person/" + personID, config);
                    person = personResult.data;
                    updatePerson = { ...person, nickname: nickName };
                    await axios.put(process.env.PUBLIC_URL + "/api/Person/", updatePerson, config);
                        navigate(`/TeamDetails?teamId=${teamID}`);
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
            <Button sx={{ backgroundColor: '#673ab7', m: 2 }} onClick={() => navigate(-1)}>Back</Button>
            <Form onSubmit={addTeamMemberHandler} style={{ width: '90vw', border: 'solid #673ab7', borderRadius: '30px' }}>
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col md={6} xs={8}>
                        <FormGroup>
                            <Label for="exampleEmail">
                                List the name you want displayed for the team you're joining. If you would like to remain anonymous, leave your name blank.
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
                    <Button variant='contained' sx={{ backgroundColor: 'orange' }} onClick={() => {setOpenModal(true); setMessage("Are you sure you want to join with the name " + nickName + "?")} }>Submit</Button>
                </Col>
                <DynamicModal
                    open={openModal}
                    close={closeModal}
                    message={message}
                    onConfirm={() => addTeamMemberHandler}
                    isOkConfirm={isOkModal}
                 />
                {/* <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="JoinTeamModal">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Are you sure you want your name to be:
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ alignContent: "center" }}>
                            {userName}
                        </Typography>
                        <Box className="JoinTeamModalButtonPosition">
                            <Button type='submit' variant='contained' onClick={addTeamMemberHandler} className="JoinTeamModalYesButton"> Yes </Button>
                            <Button variant='contained' onClick={handleClose} className="JoinTeamModalNoButton" > No </Button>
                        </Box>
                    </Box>
                </Modal> */}
            </Form>
        </div>);
}
