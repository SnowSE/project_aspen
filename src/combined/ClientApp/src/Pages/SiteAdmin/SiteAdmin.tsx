import {
    Box,
    Button,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { EventContext } from "../../App";
import Event from "../../JsModels/event";
import { EventsService } from "../../services/Events/EventsService";
import { useNavigate } from "react-router-dom";

const SiteAdmin = () => {
    const { currentEvent, setCurrentEvent } = useContext(EventContext);
    const [updatedEvent, setupdatedEvent] = useState<Event>(currentEvent);
    const navigate = useNavigate();

    const updateEventHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (currentEvent.id === -1) {
            addNewEventHandler(event);
        }

        try {
            await EventsService.UpdateEventViaAxios(updatedEvent);
            alert("Update was succeful");
        } catch (e) {
            console.log("Update event failed: " + e);
        }
        setCurrentEvent(updatedEvent);
    };

    const deleteHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (currentEvent.id === -1) {
            alert("There are no events to delete");
        } else {
            if (
                window.confirm(
                    "Are you sure you want to delete this event, it can't be undone?"
                )
            ) {
                try {
                    await EventsService.DeleteEventViaAxios(currentEvent.id);
                    nextCurrentEvent();
                    alert(
                        "The deletion was succeful, you will be redirect to Home page."
                    );
                    navigate("/");
                } catch (e) {
                    alert("Delete event failed");
                }
            }
        }
    };

    const addNewEventHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await EventsService.CreateEventViaAxios(updatedEvent);
            nextCurrentEvent();
            alert("Adding new Event was succeful");
        } catch (e) {
            alert("Create New Event failed");
        }
    };

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

    useEffect(() => {

    }, []);

    return (

        <div>
            <form onSubmit={updateEventHandler}>
                <TextField
                    id="standard-helperText"
                    label="Event Title"
                    defaultValue={updatedEvent?.title}
                    variant="standard"
                    onChange={(event) => {
                        setupdatedEvent((updateEvent) => ({
                            ...updateEvent,
                            title: event.target.value,
                        }));
                    }}
                />
                <Box>
                    <TextField
                        id="standard-helperText"
                        label="Event Description"
                        defaultValue={updatedEvent?.description}
                        variant="standard"
                        onChange={(event) => {
                            setupdatedEvent((updateEvent) => ({
                                ...updateEvent,
                                description: event.target.value,
                            }));
                        }}
                    />
                </Box>
                <Box>
                    <TextField
                        id="standard-helperText"
                        label="Event Location"
                        defaultValue={updatedEvent?.location}
                        variant="standard"
                        onChange={(event) => {
                            setupdatedEvent((updateEvent) => ({
                                ...updateEvent,
                                location: event.target.value,
                            }));
                        }}
                    />
                </Box>
                <Box>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            defaultValue={updatedEvent?.donationTarget}
                            onChange={(event) => {
                                setupdatedEvent((updateEvent) => ({
                                    ...updateEvent,
                                    donationTarget: parseInt(event.target.value),
                                }));
                            }}
                            startAdornment={
                                <InputAdornment position="start">$</InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "orange" }}
                        type="submit"
                    >
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "orange" }}
                        type="button"
                        onClick={deleteHandler}
                    >
                        Delete
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default SiteAdmin;
