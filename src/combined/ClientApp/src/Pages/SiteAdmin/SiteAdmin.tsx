import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { EventContext } from "../../App";
import { authService } from "../../services/authService";
import Event from "../../JsModels/event";
import { EventsService } from "../../services/Events/EventsService";
import { AspenEvent } from "../../interfaces";

const SiteAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const currentEvent: Event = useContext(EventContext);
    const [updatedEvent, setupdatedEvent] = useState<Event>(currentEvent);

    const updateEventHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        var changedEvent: AspenEvent = {
            date: updatedEvent.date,
            title: updatedEvent.title,
            location: updatedEvent.location,
            description: updatedEvent.description,
            mainImage: updatedEvent.mainImage,
            donationTarget: updatedEvent.donationTarget,
        };
        try {
            await EventsService.UpdateEventViaAxios(changedEvent);
        } catch (e) {
            console.log("Update Event failed: " + e);
        }
    };

    const deleteHandler = async (event: React.FormEvent) => {
        console.log("ready to delete event");
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
            {isAdmin ? (
                <Typography>
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
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "orange" }}
                            type="submit"
                        >
                            Update
                        </Button>
                    </form>
                </Typography>
            ) : (
                <h1 data-testid="NotAdminResult">No</h1>
            )}
        </div>
    );
};

export default SiteAdmin;
