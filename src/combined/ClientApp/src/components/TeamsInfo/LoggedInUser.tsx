import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";

export function LoggedInUser() {

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    console.log("Team id:",typeof(id))




    interface registration {
        creationDate: number,
        isPublic: boolean,
        nickname: string,
        ownerID: number,
        teamID: number,
        personRegistrations: [
            {
                personID: number,
                person: {
                    authID: string,
                    name: string,
                    bio: string
                },
                createdDate: number
            }
        ]
    }

    const navigate = useNavigate();
    
    const [creationDate, setCreationDate] = useState<number>(new Date().getTime());
    //THis is under the question
    const [isPublic, setBooleanFlag] = useState<boolean>(true);
    const [nickName, setNickName] = useState<string>('');
    const [personRegistrations, setPersonRegistration] = useState([]);


    const addTeamMemberHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        const api = process.env.REACT_APP_BASE_URL + `/api/Registration`;
        console.log(api)

        let newMember: registration = {
            creationDate: creationDate,
            isPublic: isPublic,
            nickname: nickName,
            ownerID: 2,
            teamID: 1,
            personRegistrations: [
                {
                    personID: 10,
                    person: {
                        authID: '10',
                        name: 'Durli',
                        bio: 'Some bio'
                    },
                    createdDate: creationDate
                }
            ]
        }

        const postNewMember = await axios.post(api, newMember)
                .then((response) => { })
                .catch((error) => { console.log(error.response.data) })

        setNickName(''),
        setPersonRegistration([])
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

