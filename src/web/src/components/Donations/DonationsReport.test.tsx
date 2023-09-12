import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import DonationReport from "./DonationsReport";

const middlewares = [thunk];
const initialState = {
    auth: {
        user: {
            access_token: ''
        }
    },
    event: {
        events: []
    }
};
let store = configureStore(middlewares);
function TestWrapper({ children }: { children: any }) {
    return <Router >
        <Provider store={store(initialState)}>
            {children}
        </Provider>
    </Router>
}
describe("Donation Report tests", () => {
    test("Check for appropiate number of headers", () => {
        render(
            <TestWrapper children={<DonationReport />} />
        )
        const header = screen.getByTestId("headers")
        expect(header.childElementCount).toBe(6)
    })
    test("Verify loading template", () => {
        render(
            <TestWrapper children={<DonationReport />} />
        )
        const loadingRow = screen.getByTestId("loading-row")
        expect(loadingRow).toBeInTheDocument()
    })
});
