import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import PersonRegistrations from "../../JsModels/personRegistrations";
import registration from "../../JsModels/registration";
import {Team } from "./Interfaces"


export function LoggedInUser() {

    const [searchParams] = useSearchParams();
    const loggedInUSer = localStorage.getItem("LoggedInUser")
    console.log("I am currently logged in as", typeof (loggedInUSer));

    if (loggedInUSer !== null) {
        var user = loggedInUSer;
        console.log("I am a user", user);
    }
    const list=[]
    for (var entry of searchParams.entries()) {
        console.log(entry[1]);
        const [teamId, teamIdValue] = entry;
        list.push(entry[1])
    }
    console.log("I am list", list[0]);
        
   
    if (list[0] !== null) {
        var tId = parseInt(list[0]);   // parse the string back to a number.
        console.log("Converted team id",typeof( tId));
    }   
   
    if (list[1] !== null) {
        var ownerId = parseInt(list[1]);   // parse the string back to a number.
        console.log("Converted ownerID", typeof(ownerId))
    }

    //interface registration {
    //    creationDate: Date,
    //    isPublic: boolean,
    //    nickname: string,
    //    ownerID: number,
    //    teamID: number,
    //    personRegistrations: PersonRegistrations[]
    //}

    const navigate = useNavigate();
    
    const [creationDate, setCreationDate] = useState<Date>(new Date(0));
    //THis is under the question
    const [isPublic, setBooleanFlag] = useState<boolean>(true);
    const [nickName, setNickName] = useState<string>('');
    const [personRegistrations, setPersonRegistration] = useState([]);


    const addTeamMemberHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        const api = process.env.REACT_APP_BASE_URL + `/api/Registration`;
        console.log(api)

        let newMember: registration = {
            id: 1,
            creationDate: creationDate,
            isPublic: isPublic,
            nickname: nickName,
            ownerID: ownerId,
            teamID: tId,
            // this part needs to be fixed, currently it is static but it should be dynamic
            personRegistrations:  [
                {
                    id: 3,
                    personID: 10,
                    person: {
                        id: 1,
                        authID: '',
                        name: user,
                        bio: ' '
                    },
                    createDate: creationDate
                }
            ]
        }

        const postNewMember = await axios.post(api, newMember)
                .then((response) => { })
                .catch((error) => { console.log(error.response.data) })

        setNickName('')
        setPersonRegistration(personRegistrations)
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>

            <Form onSubmit={addTeamMemberHandler} style={{ width: '90vw', border: 'solid #673ab7', borderRadius: '30px' }}>
                
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col md={6} xs={8}>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Person Name
                            </Label>
                            <Input
                                id="nickName"
                                name="nickName"
                                placeholder="nick Name"
                                value={nickName}
                                onChange={event => setNickName(event.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>              
               
                <Col md={12} xs={8} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant='contained' sx={{ backgroundColor: 'orange' }} type="submit" >Submit</Button>
                </Col>
            </Form>
        </div>);
   


}

