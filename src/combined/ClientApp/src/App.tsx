import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Layout } from "./components/Layout";
import "./custom.css";
import Event from "../src/JsModels/event";

const root = process.env.PUBLIC_URL;
if (!root && process.env.NODE_ENV !== "test") {
    throw new Error("PUBLIC_URL is undefined");
}

console.log('FIRST Secret: ', process.env.MY_DUMMY_SECRET);
console.log('2nd Secret: ', process.env.MY_SECOND_DUMMY_SECRET);

export const EventContext = React.createContext({} as any);

function App() {
    const [currentEvent, setCurrentEvent] = React.useState<Event>();
    const value = { currentEvent, setCurrentEvent };

    const currentEventInit = async () => {
        var allEvents = await fetch(`${root}/api/events`);
        var allEventsJson = await allEvents.json();

        if (allEventsJson.length > 0) {
            var jsonEvent: Event[] = JSON.parse(JSON.stringify(allEventsJson));
            const today = new Date();

            var eventEndingAfterToday = jsonEvent.filter((event: Event) => {
                var eventDate = new Date(event.date);
                return eventDate >= today;
            });

            var closesEventDate = eventEndingAfterToday.sort(function (a, b) {
                return a.date > b.date ? 1 : -1;
            });

            var unArchivedEvents = closesEventDate.filter((event: Event) => event.isArchived === false)

            if (unArchivedEvents.length > 0) {
                setCurrentEvent(unArchivedEvents[0]);
            }
            else {
                const defaultEvent = new Event(
                    new Date(),
                    "", // location
                    "", // mainImage
                    "", // description!
                    "There are currently no upcoming events.",
                    0,  // donationTarget
                    false,
                    -1,//id
                );
                setCurrentEvent(defaultEvent);
            };
        }
            else {
                const defaultEvent = new Event(
                    new Date(),
                    "", // location
                    "", // mainImage
                    "", // description!
                    "There are currently no upcoming events.",
                    0,  // donationTarget
                    false,
                    -1,//id
                );
                setCurrentEvent(defaultEvent);
            };
        };

        useEffect(() => {
            console.log("App mounted");
            currentEventInit();
        }, []);

        return (
            <EventContext.Provider data-testid={"eventContext"} value={value}>
                <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
                    <Layout>
                        <Routes>
                            {AppRoutes.map((route, index) => {
                                const { element, ...rest } = route;
                                return <Route key={index}  {...rest} element={element} />;
                            })}
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </EventContext.Provider>
        );
    }
    export default App;