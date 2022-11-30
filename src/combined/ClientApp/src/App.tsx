import React, { Component, createContext, useEffect, useRef } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import NavMenu from './components/Navigation/NavMenu';
import './custom.css';
import Event from '../src/JsModels/event'



const root = process.env.PUBLIC_URL
if(!root && process.env.NODE_ENV != 'test') {
    throw "PUBLIC_URL is undefined";
}

export const EventContext = React.createContext({} as any);

function App() {

    const [latestEvent, setLatestEvent] = React.useState<Event>();

    const currentEventInit = async () => {

        var allEvents = await fetch(`${root}/api/events`);
        var allEventsJson = await allEvents.json();

        const maxEventDate = allEventsJson.reduce(
            (max: Date, allEventsJson: { date: Date; }) => (allEventsJson.date > max ? allEventsJson.date : max),
            allEventsJson[0].date);
        const latestEventFromJson: Event = allEventsJson.find(
            (event: { date: Date }) => event.date === maxEventDate);
        
        if (latestEventFromJson) {
            setLatestEvent(latestEventFromJson);
        }
        else {
            console.log("No events found on start up");
        }
    }

    useEffect(() => {
        console.log("App mounted");
        currentEventInit();
    }, []);
    
    return (
        <EventContext.Provider data-testid={"eventContext"}  value={latestEvent}>
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