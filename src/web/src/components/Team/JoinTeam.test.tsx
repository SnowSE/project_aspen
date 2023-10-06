import configureStore from 'redux-mock-store'
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import JoinTeam from "./JoinTeam"
import thunk from 'redux-thunk'

describe("Test join team page", () => {
    const middlewares = [thunk];
    const initialState = {
        person: {
            selectedPerson: {
                authID: "string",
                name: "string",
                bio: "string"
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
                    <JoinTeam eventId={1} />
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