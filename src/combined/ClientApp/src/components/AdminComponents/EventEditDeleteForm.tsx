import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../../App";
import Event from "../../JsModels/event";
import { EventsService } from "../../services/Events/EventsService";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import DynamicModal from "../DynamicModal";


const EventEditDeleteForm = () => {
    const { currentEvent, setCurrentEvent } = useContext(EventContext);
    useEffect(() => {
    }, [currentEvent]);
    const [updatedEvent, setupdatedEvent] = useState<Event>(currentEvent);
    const [openArchiveModal, setopenArchiveModal] = useState(false);
    const [isOkModal, setIsOkModal] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const closeModal = () => {
        setopenArchiveModal(false)
        setIsOkModal(false)
        setMessage("")
    }

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
                    -1,//id
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
            
        } catch (e) {
            console.log("Update event failed: " + e);
        }
        setCurrentEvent(updatedEvent);
    };

    const archiveHandler = async () => {
        //event.preventDefault();
        if (currentEvent.id === -1) {
            alert("There are no events to delete");
        } 
        else {
            try {
                updatedEvent.isArchived = true;
                setupdatedEvent(updatedEvent);
                await EventsService.UpdateEventViaAxios(updatedEvent);
                nextCurrentEvent();
                navigate(0);
            } catch (e) {
                alert("Archive event failed");
            }
        }
    };

    return (
        <Box >
            <form className="EventFormPosition" onSubmit={updateEventHandler} >
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
                    InputLabelProps={{ className: "EventEditDeleteFormDetailsLabel"}}
                    InputProps={{ className: "EventEditDeleteFormDetails" }}
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
                        InputProps={{ className: "EventEditDeleteFormDetails" }}
                        InputLabelProps={{ className: "EventEditDeleteFormDetailsLabel" }}
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
                        InputProps={{ className: "EventEditDeleteFormDetails" }}
                        InputLabelProps={{ className: "EventEditDeleteFormDetailsLabel" }}
                    />
                </Box>
                <Box>
                    <TextField
                        variant="standard"
                        id="standard-adornment-amount"
                        type="number"
                        label="Amount"
                        InputLabelProps={{ className: "EventEditDeleteFormDetailsLabel" }}
                        InputProps={{ inputProps: { min: 0 }, className: "EventEditDeleteFormDetails", startAdornment: (<AttachMoneyOutlinedIcon className="MoneyOutlineIcon" />) }}
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
                        type="submit"
                        onClick={() => {setopenArchiveModal(true); setMessage("Are you sure you want to archive this event: " + updatedEvent.title + "?")}}
                    >
                         Archive

                    </Button>
                    <DynamicModal
                        open={openArchiveModal}
                        close={closeModal}
                        message={message}
                        onConfirm={archiveHandler}
                        isOkConfirm={isOkModal}
                    />
                 </Box>
            </form>
        </Box>

    )
}

export default EventEditDeleteForm