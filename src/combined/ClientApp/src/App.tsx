import React, { Component, createContext, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import NavMenu from './components/NavMenu';
import './custom.css';


const root = process.env.PUBLIC_URL
if (!root) {
    throw "PUBLIC_URL is undefined";
}

export const EventContext = React.createContext('56');

function App() {

    const [eventID, setEventID] = React.useState<Event>();
    
    const currentEventInit = async () => {
        console.log("got here")
        var temp = await fetch(`${root}/api/events`);
        var temp2 = await temp.json();
        const maxId = temp2.reduce(
            (max: number, temp2: { id: number; }) => (temp2.id > max ? temp2.id : max),
            temp2[0].id
        );
        var newEvent = new DtoEvent
        {
            Description = "Marathon1",
                Title = "Marathon at Snow",
                Location = "Snow",
                MainImage = "Snow.jpg"
        };
        setEventID(maxId.toString());
        
    }
    

    
    useEffect(() => {
        console.log("App mounted");

        currentEventInit();

    }, []); 
    return (
        <EventContext.Provider value= {eventID} >
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
    )
}
export default App;