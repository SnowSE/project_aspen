import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router} from "react-router-dom";
import EventTeam from "./EventTeam";

describe("Event Team tests", ()=>{
    test('Checks for join team button', () => {
        render(
            <Router>
              <EventTeam />
            </Router>
          );
          // Act
     
          const formElement = screen.getByText(/Join Team/);
          expect(formElement).toBeInTheDocument();
    });
    test('Checks for Create team button', () => {
        render(
            <Router>
              <EventTeam />
            </Router>
          );
          // Act
     
          const formElement = screen.getByText(/Create Team/);
          expect(formElement).toBeInTheDocument();
    });
    test('Checks create team button link', () => {
        render(
            <Router>
              <EventTeam />
            </Router>
          );
          // Act
     
          const formElement = screen.getByRole('link', {name:'Create Team'});
          expect(formElement).toHaveAttribute('href', '/teamregistration');
    });
    test('Checks join team button link', () => {
        render(
            <Router>
              <EventTeam />
            </Router>
          );
          // Act
     
          const formElement = screen.getByRole('link', {name:'Join Team'});
          expect(formElement).toHaveAttribute('href', '/jointeam');
    });
});