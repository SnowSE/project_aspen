import React, {useEffect} from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import Event from '../src/JsModels/event'



const root = process.env.PUBLIC_URL
if (!root && process.env.NODE_ENV !== 'test') {
    throw new Error("PUBLIC_URL is undefined");
}

export const EventContext = React.createContext({} as any);

function App() {
    const [latestEvent, setLatestEvent] = React.useState<Event>();

    const currentEventInit = async () => {

        var allEvents = await fetch(`${root}/api/events`);
        var allEventsJson = await allEvents.json();
        const today = new Date();
        if (allEventsJson.length > 0) {
            const closestEvent = allEventsJson.reduce((a: Event, b: Event) => {
                const diff = new Date(a.date).getTime() - today.getTime();
                return diff > 0 && diff < new Date(b.date).getTime() - today.getTime()
                    ? a
                    : b;
            });
            setLatestEvent(closestEvent);
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
            setLatestEvent(defaultEvent);
        };
    }

    useEffect(() => {
        console.log("App mounted");
        currentEventInit();
    }, []);

    return (
        <EventContext.Provider data-testid={"eventContext"} value={latestEvent}>
            <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
                <Layout>
                    <Routes>
                        {AppRoutes.map((route, index) => {
                            const { element, ...rest } = route;
                            return <Route key={index} {...rest} element={element} />;
                        })}
                    </Routes>
                </Layout>
            </BrowserRouter>
        </EventContext.Provider>
    );
}
export default App;