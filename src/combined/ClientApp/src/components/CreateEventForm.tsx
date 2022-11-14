import React, { useState } from "react";
import { Form } from "react-router-dom";
import { FormGroup, Row, Col, Label, Input, FormText, Button } from "reactstrap";

const CreateEventForm = () => {

    const [date, setDate] = useState<Date>(new Date)

    const createEventHandler = (event: React.FormEvent) => {
        event.preventDefault()
    }


    return ( 
        <>
        <Form onSubmit = {createEventHandler} style={{width:'90vw', border:'solid #673ab7', borderRadius:'30px'}}>
            
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
                            name="text"
                            type="textarea"
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
                        />
                    </Col>
                </Row>
            </FormGroup>
            <Col md={12} xs={8} style={{ display: 'flex', justifyContent: 'center' }}>

                <Button variant='contained' sx={{backgroundColor:'orange'}} type = "submit" >Submit</Button>
            </Col>
        </Form>
        </>
     );
}
 
export default CreateEventForm;