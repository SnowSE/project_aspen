import { Box, Button, Typography, Modal } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";


export function LoggedInUser() {

    const navigate = useNavigate();
    const [nickName, setNickName] = useState<string>('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        if (nickName === null || nickName === '' || !nickName?.trim()) {
            setNickName("Anonymous")
        }
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const addTeamMemberHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };
        var currentUserUrl = process.env.PUBLIC_URL + "/api/User"
        const currentUser = await axios.get(currentUserUrl, config)
        console.log("I am the current user", Number(currentUser.data.id));
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
