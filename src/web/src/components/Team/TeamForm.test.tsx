import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import TeamForm from "./TeamForm";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

describe("Team Form tests", () => {
  const middlewares = [thunk];
  const initialState = {
    event: {
      events: [
        {
          name: "temp",
          date: new Date(2022, 6, 10),
        },
        {
          name: "temp2",
          date: new Date(2023, 6, 11),
        },
      ],
    },
  };
  const mockStore = configureStore(middlewares);
  let store;
  test("Checks", () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <TeamForm ownerId={1} />
        </Router>
      </Provider>
    );

    const formElement = screen.getByText(/Description/);
    expect(formElement).toBeInTheDocument();
  });
});
