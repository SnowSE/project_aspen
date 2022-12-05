import React, { useEffect, useState } from "react";
import { Button } from '@mui/material'
import { FormGroup, Row, Col, Label, Input, FormText, Form } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AspenEvent } from "../../interfaces";
import { EventsService } from "../../services/Events/EventsService";
const CreateEventForm = () => {

    var navigate = useNavigate();
    const [eventDate, setEventDate] = useState<Date>(new Date(0))
    const [eventTitle, setEventTitle] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [eventDescription, setEventDescription] = useState("")
    const [eventMainImage, setEventMainImage] = useState("")
    const [eventDonationTarget, setEventDonationTarget] = useState(0)
    const [disableSubmit, setDisableSubmit] = useState(true)
    const createEventHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        var newEvent: AspenEvent = {
            date: eventDate,
            title: eventTitle,
            location: eventLocation,
            description: eventDescription,
            mainImage: eventMainImage,
            donationTarget: eventDonationTarget
        }

        await EventsService.CreateEventViaAxios(newEvent)

        navigate("/")

    }
    
    useEffect(() => {
        if (Date.parse(eventDate.toString()) && eventTitle.trim().length !== 0 && eventLocation.trim().length !== 0 && eventDonationTarget > 0 && eventDescription.trim().length !== 0) {
            setDisableSubmit(false)
        }
        else {

            setDisableSubmit(true)
        }
    }, [eventTitle, eventLocation, eventDescription, eventDonationTarget, eventDate])


    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Create Event here</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Form onSubmit={createEventHandler} style={{ width: '90vw', border: 'solid #673ab7', borderRadius: '30px' }}>
                    <FormGroup>

                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                            <Col md={6} xs={8}>
                                <FormGroup>
                                    <Label>
                                        Event Title
                                    </Label>

                                    <Input
                                        placeholder="Event Title"
                                        aria-label="eventTitle"
                                        data-testid="eventTitleInput"
                                        onChange={e => setEventTitle(e.currentTarget.value)}
                                    />
                                </FormGroup>
                            </Col>

                        </Row>
                    </FormGroup>
                    <FormGroup>


                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                            <Col md={6} xs={8}>
                                <FormGroup>
                                    <Label>
                                        Event Location
                                    </Label>
                                    <Input
                                        placeholder="Event Location"
                                        aria-label="eventLocation"
                                        data-testid="eventLocationInput"

                                        onChange={e => setEventLocation(e.currentTarget.value)}
                                    />
                                </FormGroup>
                            </Col>

                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row style={{ display: 'flex', justifyContent: 'center' }}>

                            <Col md={6} xs={8}>


                                <Label>
                                    Event Description
                                </Label>
                                <Input
                                    type="textarea"
                                    aria-label="eventDescription"
                                    data-testid="eventDescriptionInput"

                                    onChange={e => setEventDescription(e.currentTarget.value)}

                                />

                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                            <Col md={6} xs={8}>

                                <Label>
                                    Donation Target
                                </Label>
                                <Input
                                    placeholder="$"
                                    type="number"
                                    aria-label="eventDonationGoal"
                                    data-testid="eventDonationGoalInput"

                                    onChange={e => setEventDonationTarget(Number(e.currentTarget.value))}

                                />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                            <Col md={6} xs={8}>

                                <Label>
                                    Event Start Date
                                </Label>
                                <Input
                                    type="date"
                                    aria-label="eventDate"
                                    data-testid="eventDateInput"

                                    onChange={e => setEventDate(e.currentTarget.valueAsDate!)}

                                />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                            <Col md={6} xs={8}>
                                <Input
                                    id="exampleFile"
                                    name="file"
                                    type="file"
                                    placeholder="Team Logo"
                                    onChange={e => setEventMainImage(e.target.value)}
                                />
                                <FormText>
                                    Select an image that will be displayed as your team's logo
                                </FormText>
                            </Col>
                        </Row>
                    </FormGroup>
                    <Col md={12} xs={8} style={{ display: 'flex', justifyContent: 'center' }}>

                        <Button variant='contained' disabled={disableSubmit} sx={{ backgroundColor: 'orange' }} type="submit" >Submit</Button>
                    
                    </Col>
                </Form>

            </div>
        </>

    );
}

export default CreateEventForm;