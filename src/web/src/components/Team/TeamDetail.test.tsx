import configureStore from 'redux-mock-store'
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import TeamDetail from "./TeamDetail";
import thunk from 'redux-thunk'

describe("Test TeamDetail gets a team", () => {
    const middlewares = [thunk];
    const initialState = {
        team: {
            currentTeam: {
                id: "string",
                name: "string",
                description: "string",
                mainImage: "string",
                ownerID: "number",
                eventID: "number",
                donationTarget: "number"
            }
        },
        team: {
            teamList: [ ]
        }
    }
    const mockStore = configureStore(middlewares);
    let store;

    test('Check if filter bar', () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <TeamDetail/>
                </BrowserRouter>
            </Provider>
        );

        const filterBar = screen.getByText(/Filter by name/);
        expect(filterBar).toBeInTheDocument();
    })

    test('Check if create new team button', () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <JoinTeam eventId={1} />
                </BrowserRouter>
            </Provider>
        );

        const createButton = screen.getByText(/Create New Team/);
        expect(createButton).toBeInTheDocument();
    })
})