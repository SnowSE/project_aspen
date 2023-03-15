import { Box, Button, styled, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../../App";
import Event from "../../JsModels/event";
import { EventsService } from "../../services/Events/EventsService";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white !important',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white !important',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white !important',
        },
        '&:hover fieldset': {
            borderColor: 'white !important',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white !important',
        },
    },
});
const TeamEditDelete = () => {
    const { currentEvent, setCurrentEvent } = useContext(EventContext);
    useEffect(() => {
    }, [currentEvent]);
    const [updatedEvent, setupdatedEvent] = useState<Event>(currentEvent);
    const navigate = useNavigate();


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
                    false,
                    -1 // id
                );
                setCurrentEvent(defaultEvent);
            }
        }

    };

    const addNewEventHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            //maybe go to the create event page? or
            // 
            await EventsService.CreateEventViaAxios(updatedEvent);
            nextCurrentEvent();
            alert("Adding new Event was successful");
        } catch (e) {
            alert("Create New Event failed");
        }
    };
    const updateEventHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (currentEvent.id === -1) {
            addNewEventHandler(event);
        }

        try {
            await EventsService.UpdateEventViaAxios(updatedEvent);
            alert("Update was successful");
        } catch (e) {
            console.log("Update event failed: " + e);
        }
        setCurrentEvent(updatedEvent);
    };

    const archiveHandler = async (event: Event) => {
        //event.preventDefault();
        if (currentEvent.id === -1) {
            alert("There are no events to delete");
        } else {
            if (
                window.confirm(
                    "Are you sure you want to archive this event, it can't be undone?"
                )
            ) {
                try {
                    await EventsService.ArchiveEventViaAxios(currentEvent.id);
                    event.isArchived;
                    nextCurrentEvent();
                    alert(
                        "The archive was successful, you will be redirected to Home page."
                    );
                    navigate("/");
                } catch (e) {
                    alert("Archive event failed");
                }
            }
        }
    };

    return (
        <Box >
            <form className="EventFormPosition" onSubmit={updateEventHandler} >
                <CssTextField
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
                    InputProps={{ className: "EventEditDeleteFormDetails" }}
                />

                <Box>
                    <CssTextField
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
                        InputProps={{ className: "EventEditDeleteFormDetails" }}
                    />
                </Box>
                <Box>
                    <CssTextField
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
                        InputProps={{ className: "EventEditDeleteFormDetails" }}
                    />
                </Box>
                <Box>
                    <CssTextField
                        variant="standard"
                        id="standard-adornment-amount"
                        type="number"
                        label="Amount"
                        InputProps={{ inputProps: { min: 0 }, className: "EventEditDeleteFormDetails", startAdornment: (<AttachMoneyOutlinedIcon sx={{ color: 'white' }} />) }}
                        defaultValue={updatedEvent.donationTarget}
                        onChange={(event) => {
                            setupdatedEvent((updateEvent) => ({
                                ...updateEvent,
                                donationTarget: parseInt(event.target.value),
                            }));
                        }}

                    />
                </Box>
                <Box className="PaddingBetweenItems">
                    <Button
                        variant="contained"
                        className="UpdateButtonDetails"
                        type="submit"
                    >
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        className="DeleteButtonDetails"
                        type="button"
                        onClick={() => archiveHandler}
                    >
                        Delete

                    </Button>
                </Box>
            </form>
        </Box>

    )
}

export default TeamEditDelete