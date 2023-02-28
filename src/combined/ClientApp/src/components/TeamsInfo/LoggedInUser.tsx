import { Box, Button, Typography, Modal } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { EventContext } from "../../App";


export function LoggedInUser() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [nickName, setNickName] = useState<string>('');
    const [teamID, setTeamID] = useState<number>(-1);
    const [personID, setPersonID] = useState<number>(-1);
    const { currentEvent } = useContext(EventContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        if (nickName === null || nickName === '' || !nickName?.trim()) {
            setNickName("Anonymous")
        }
        setOpen(true);
    }

    const handleClose = () => setOpen(false);
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };

    const addTeamMemberHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        const now = new Date();
        const utcDate = now.toISOString(); 
        const personTeam = { personId: personID, teamId: teamID, eventId: currentEvent.id, DateJoined: utcDate }
        const result = await axios.post(process.env.PUBLIC_URL + "/api/PersonTeamAssociation", personTeam);

        navigate(-1);
    }

    const handleChange = (e: any) => {
        setNickName(e.target.value);

    };

    let userName;
    if (!nickName) {
        userName = <Typography>Anonymous</Typography>
    }
    else {
        userName = <Typography>{nickName}</Typography>
    }
    useEffect(() => {
        const list = [];
        for (const entry of searchParams.entries()) {
            list.push(entry[1]);
        }
        const [teamID, personID, eventID] = list.map(Number);
        setTeamID(teamID);
        setPersonID(personID);
    }, []);


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
                    <Button variant='contained' sx={{ backgroundColor: 'orange' }} onClick={handleOpen}>Submit</Button>
                </Col>
                <Modal
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
                </Modal>
            </Form>
        </div>);
}
