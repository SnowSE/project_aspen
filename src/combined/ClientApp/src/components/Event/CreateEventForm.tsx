import React, { useEffect, useState, useContext } from "react";
import { Button } from '@mui/material'
import { FormGroup, Row, Col, Label, Input, FormText, Form } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Event from "../../JsModels/event";
import { EventsService } from "../../services/Events/EventsService";
import { EventContext } from "../../App";

const CreateEventForm = () => {

    var navigate = useNavigate();
    const [eventDate, setEventDate] = useState<Date>(new Date(0))
    const [eventTitle, setEventTitle] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [eventDescription, setEventDescription] = useState("")
    const [eventMainImage, setEventMainImage] = useState("")
    const [eventDonationTarget, setEventDonationTarget] = useState(0)
    const [disableSubmit, setDisableSubmit] = useState(true)
    const { setCurrentEvent } = useContext(EventContext);

    const nextCurrentEvent = async () => {
        var allEvents = await fetch(`${process.env.PUBLIC_URL}/api/events`);
        var allEventsJson = await allEvents.json();

        if (allEventsJson.length > 0) {
            var jsonEvent: Event[] = JSON.parse(JSON.stringify(allEventsJson));
            const today = new Date();

            var eventsEndingAfterToday = jsonEvent.filter((event: Event) => {
                var eventDate = new Date(event.date);
                return eventDate >= today;
            });

            var closesEventDate = eventsEndingAfterToday.sort(function (a, b) {
                return a.date > b.date ? 1 : -1;
            });

            if (closesEventDate.length > 0) {
                setCurrentEvent(closesEventDate[0]);
            } else {
                const defaultEvent = new Event(
                    new Date(),
                    "", // location
                    "", // mainImage
                    "", // description!
                    "There are currently no upcoming events.",
                    0, // donationTarget
                    -1 // id
                );
                setCurrentEvent(defaultEvent);
            }
        }
        };

        const createEventHandler = async (event: React.FormEvent) => {
            event.preventDefault()

            var newEvent: Event = {
                date: eventDate,
                title: eventTitle,
                location: eventLocation,
                description: eventDescription,
                mainImage: eventMainImage,
                donationTarget: eventDonationTarget
            }

            try {
                await EventsService.CreateEventViaAxios(newEvent)
                nextCurrentEvent();
                navigate("/")
            } catch (e) {
                alert("Could not add Event");
            }


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
                <h1 className="EventHeader">Create Event here</h1>
                <div className="FormEventPageContentPosition">
                    <Form onSubmit={createEventHandler} className="FormEventBorder">
                        <FormGroup>

                            <Row className="FormEventRowOne">
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

                            <Row className="FormEventRowTwo">
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
                            <Row className="FormEventRowThree">

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
                            <Row className="FormEventRowFour">
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
                            <Row className="FormEventRowFive">
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
                            <Row className="FormEventRowSix">
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
                        <Col md={12} xs={8} className="FormEventButtonPosition">

                            <Button variant='contained' disabled={disableSubmit} className="FormEventButtonSubmit" type="submit" >Submit</Button>
                        </Col>
                    </Form>

                </div>
            </>

        );
    }


export default CreateEventForm;