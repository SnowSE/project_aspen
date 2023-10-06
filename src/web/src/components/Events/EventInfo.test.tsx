import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router} from "react-router-dom";
import EventInfo from "./EventInfo"
import EventModel from "../../models/event";

describe("Event Info tests", ()=>{
    const event = new EventModel(undefined, undefined, "this is a event", undefined, undefined, undefined)

    test('Checks for join team button', () => {
        render(
            <Router>
              <EventInfo event={event} />
            </Router>
          );
          // Act
     
          const formElement = screen.getByText(/Donate/);
          expect(formElement).toBeInTheDocument();
    });
    
    test('Checks create team button link', () => {
        render(
            <Router>
              <EventInfo event={event} />
            </Router>
          );
          // Act
     
          const formElement = screen.getByRole('link', {name:'Donate'});
          expect(formElement).toHaveAttribute('href', '/donate/-1');
    });
    
});