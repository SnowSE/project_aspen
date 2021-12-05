import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router} from "react-router-dom";
import EventModel from "../../models/eventModel";
import EventTeams from "./EventTeams";

describe("Event Teams tests", ()=>{

    test('Checks for Registered Teams text', ()=>{
        render(
            <Router>
                <EventTeams event={new EventModel(undefined,undefined,undefined,undefined,undefined)}/>
            </Router>
        );

        const formElement = screen.getByText(/Registered Teams/)
        expect(formElement).toBeInTheDocument();
    })

    test('Checks for joint team button', ()=>{
        render(
            <Router>
                <EventTeams event={new EventModel(undefined,undefined,undefined,undefined,undefined)}/>
            </Router>
        );

        const formElement = screen.getByText(/Join Team/);
        expect(formElement).toBeInTheDocument();
    });
})