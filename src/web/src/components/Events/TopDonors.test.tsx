import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import EventModel from "../../models/eventModel";
import TopDonors from "./TopDonors";
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'

describe('Top Donors tests', () => {
    const middlewares = [thunk];
    const initialState = {

        team: {
            teamList: []
        }
    }
    const mockStore = configureStore(middlewares);
    let store;
    test('checks for top donors text', () => {
        store = mockStore(initialState)
        render(
            <Provider store={store}>
                <Router>
                    <TopDonors event={new EventModel(undefined, undefined, undefined, undefined, undefined)} />
                </Router>
            </Provider>

        )

        const formElement = screen.getByText(/Top Donors/);
        expect(formElement).toBeInTheDocument();
    })
})