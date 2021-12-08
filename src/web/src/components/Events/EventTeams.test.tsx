import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router} from "react-router-dom";
import EventModel from "../../models/eventModel";
import EventTeams from "./EventTeams";
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";

describe("Event Teams tests", ()=>{
    const middlewares = [thunk];
    const initialState = {

        team: {
            teamList: []
        }
    }
    const mockStore = configureStore(middlewares);
    const store = mockStore(initialState)
    test('Checks for Registered Teams text', ()=>{
    
        render(
            <Provider store={store}>
                <Router>
                <EventTeams event={new EventModel(undefined,undefined,undefined,undefined,undefined)}/>
            </Router>
            </Provider>
            
        );

        const formElement = screen.getByText(/Registered Teams/)
        expect(formElement).toBeInTheDocument();
    })

    test('Checks for joint team button', ()=>{
        render(
            
            <Provider store={store}>
                 <Router>
                <EventTeams event={new EventModel(undefined,undefined,undefined,undefined,undefined)}/>
            </Router>
            </Provider>
           
        );

        const formElement = screen.getByText(/View Teams/);
        expect(formElement).toBeInTheDocument();
    });
})