import { Box, Button, FormControl, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { EventContext } from "../../App";
import { authService } from "../../services/authService";
import Event from "../../JsModels/event";
import { EventsService } from "../../services/Events/EventsService";


const SiteAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
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

    useEffect(() => {
        async function currentUser() {
            var user = await authService.getUser();
            console.log("user roles:", user?.profile.roles);
            user?.profile.roles.forEach((role: string) => {
                console.log(role);
                if (role.includes("admin")) {
                    console.log("here");
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            });
        }
        currentUser();
    }, []);

    return (

        <div>
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
                        <FormControl variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                defaultValue={updatedEvent.donationTarget}
                                onChange={(event) => {
                                    setupdatedEvent((updateEvent) => ({
                                        ...updateEvent,
                                        donationTarget: parseInt(event.target.value),
                                    }));
                                }}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
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
