import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import alertSlice from "../../../store/alertSlice";

const store = configureStore({ reducer: { alert: alertSlice.reducer } })
function TestWrapper({ children }: { children: any }) {
  return <Router >
    <Provider store={store}>
      {children}
    </Provider>
  </Router>
}

describe("Admin Side Bar Tests", () => {
  test("checks for the Home link", () => {
    // Arrange
    render(
      <TestWrapper children={<AdminSideBar />} />
    );
    // Act
    const linkElement = screen.getByText(/Home/);
    // Assert
    expect(linkElement).toBeInTheDocument();
  });
  test("checks for the Events link", () => {
    // Arrange
    render(
      <TestWrapper children={<AdminSideBar />} />
    );
    // Act
    const linkElement = screen.getByText(/Events/);
    // Assert
    expect(linkElement).toBeInTheDocument();
  });
});
