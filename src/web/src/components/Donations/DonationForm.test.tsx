import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import DonationForm from "./DonationForm";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

describe("Donation Form tests", () => {
  const middlewares = [thunk];
  const initialState = {
    team: {
      teamList: [
        {
          id: 1,
          name: "Team1",
        },
        {
          id: 2,
          name: "Team2",
        },
      ],
    },
    event: {
      events:[
        {
          id:0,
          title: "this event"
        },
        {
          id:1,
          title: "second event"
        }
      ]
    },
    auth:{
      isLoggedIn: true
    },
    person:{
      selectedPerson:{
        id: 1
      }
    }
  };
  const mockStore = configureStore(middlewares);
  let store;
  test("Checks for Amount on page", () => {
    store = mockStore(initialState);
    render(
        <Provider store={store}>
            <Router>
                <DonationForm/>
            </Router>
        </Provider>
    )
    const formElement = screen.getByText(/Donation Amount/)
    expect(formElement).toBeInTheDocument();
  });
});
