import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { EventContext } from "../../App";
import Event from "../../JsModels/event";
import { EventsService } from "../../services/Events/EventsService";



const EventEditDeleteForm = () => {

    const { currentEvent, setCurrentEvent } = useContext(EventContext);
    const [updatedEvent, setupdatedEvent] = useState<Event>(currentEvent);

    const nextCurrentEvent = async () => {
        var allEvents = await fetch(`${process.env.PUBLIC_URL}/api/events`);
        var allEventsJson = await allEvents.json();
        const today = new Date();
        if (allEventsJson.length > 0) {
            const closestEvent = allEventsJson.reduce((a: Event, b: Event) => {
                const diff = new Date(a.date).getTime() - today.getTime();
                return diff > 0 && diff < new Date(b.date).getTime() - today.getTime()
                    ? a
                    : b;
            });
            setCurrentEvent(closestEvent);
        }
        else {
            const defaultEvent = new Event(
                new Date(),
                "", // location
                "", // mainImage
                "", // description!
                "There are currently no upcoming events.",
                0,  // donationTarget
                -1, // id
            );
            setCurrentEvent(defaultEvent);
        };
    };
    const updateEventHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await EventsService.UpdateEventViaAxios(updatedEvent);
        } catch (e) {
            console.log("Update Event failed: " + e);
        }
        setCurrentEvent(updatedEvent);
    };

    const deleteHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            //TODO: need to alert user that this can't be undone
            await EventsService.DeleteEventViaAxios(currentEvent.id);
        } catch (e) {
            console.log("Delete Event failed: " + e);
        }
        nextCurrentEvent();
    };

    return (
        <Box>
            <form onSubmit={updateEventHandler}>
                <TextField
                    id="standard-helperText"
                    label="Event Title"
                    defaultValue={updatedEvent.title}
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
                        defaultValue={updatedEvent.description}
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
                        defaultValue={updatedEvent.location}
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
                    <TextField
                        variant="standard"
                        id="standard-adornment-amount"
                        type="number"
                        label="Amount"
                        InputProps={{ inputProps: { min: 0 }, startAdornment: '$' }}
                        defaultValue={updatedEvent.donationTarget}
                        onChange={(event) => {
                            setupdatedEvent((updateEvent) => ({
                                ...updateEvent,
                                donationTarget: parseInt(event.target.value),
                            }));
                        }}
                    />
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
        </Box>
        
        )
}
export default EventEditDeleteForm