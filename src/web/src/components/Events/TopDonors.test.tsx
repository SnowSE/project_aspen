import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router} from "react-router-dom";
import EventModel from "../../models/eventModel";
import TopDonors from "./TopDonors";

describe('Top Donors tests', ()=>{
    test('checks for top donors text', ()=>{
        render(
            <Router>
                <TopDonors event={new EventModel(undefined, undefined, undefined, undefined,undefined)}/>
            </Router>
        )

        const formElement=screen.getByText(/Top Donors/);
        expect(formElement).toBeInTheDocument();
    })
})