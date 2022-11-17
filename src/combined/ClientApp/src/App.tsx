import React, { Component, createContext, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import NavMenu from './components/NavMenu';
import './custom.css';
import Event from '../../Models/JsModels/event'



const root = process.env.PUBLIC_URL
if (!root) {
    throw "PUBLIC_URL is undefined";
}

export const EventContext = React.createContext({} as any);

function App() {

    const [latestEvent, setLatestEvent] = React.useState<Event>();
    
    const currentEventInit = async () => {
        console.log("got here")
        var allEvents = await fetch(`${root}/api/events`);
        var allEventsJson = await allEvents.json();
        const maxEventId = allEventsJson.reduce(
            (max: number, allEventsJson: { id: number; }) => (allEventsJson.id > max ? allEventsJson.id : max),
            allEventsJson[0].id
        );
        
        var latestEvent = new Event(
            allEventsJson[maxEventId].date,
            allEventsJson[maxEventId].location,
            allEventsJson[maxEventId].description,
            allEventsJson[maxEventId].mainImage,
            allEventsJson[maxEventId].title,
            allEventsJson[maxEventId].donationTaget,
            allEventsJson[maxEventId].id,
        );
        setLatestEvent(latestEvent);
        
    }
    

    
    useEffect(() => {
        console.log("App mounted");

        currentEventInit();

    }, []); 
    return (
      <EventContext.Provider value={latestEvent}>
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