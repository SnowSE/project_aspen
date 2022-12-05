import { Button, Grid} from "@mui/material";
import axios from "axios";
import {  useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import registration from "../../JsModels/registration";



export function LoggedInUser() {

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();
    const loggedInUSer = localStorage.getItem("LoggedInUser")

    if (loggedInUSer !== null) {
        var user = loggedInUSer;
    }
    const list=[]
    for (var entry of searchParams.entries()) {
        console.log(entry[1]);
        list.push(entry[1])
    }        
   
    if (list[0] !== null) {
        var tId = parseInt(list[0]);   // parse the string back to a number.
    }   
   
    if (list[1] !== null) {
        var ownerId = parseInt(list[1]);   // parse the string back to a number.
    }

    
    const creationDate = new Date(0);
    //THis is under the question
    //const [isPublic, setBooleanFlag] = useState<boolean>(true);
    const [nickName, setNickName] = useState<string>('');
    const [personRegistrations, setPersonRegistration] = useState([]);


    const addTeamMemberHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        const api = process.env.PUBLIC_URL + `/api/Registration`;

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };

        const currentUser = await axios.get(currentUserUrl, config)
        console.log("I am the current user", Number(currentUser.data.id) );
        let newMember: registration = {
            creationDate: creationDate,
            isPublic: true,
            nickname: nickName,
            ownerID: ownerId,
            teamID: tId,
            // this part needs to be fixed, currently it is static but it should be dynamic
            personRegistrations:  [
                {   
                    personID: Number(currentUser.data.id),                    
                    createDate: creationDate
                }
            ]
        }

         await axios.post(api, newMember)
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

            <Grid item xs={4} sx={{
                display: 'flex', justifyContent: 'flex-start',
            }}>
                <Button sx={{ backgroundColor: '#FFF500', m: 2 }} onClick={() => navigate(-1)}>Go back 1 Page</Button>
            </Grid>   

        </div>);
   


}

