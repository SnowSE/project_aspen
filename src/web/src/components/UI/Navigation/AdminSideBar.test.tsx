import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";

describe("Admin Side Bar Tests", () => {
  test("checks for the Home link", () => {
    // Arrange
    render(
      <Router>
        <AdminSideBar />
      </Router>
    );
    // Act
    const linkElement = screen.getByText(/Home/);
    // Assert
    expect(linkElement).toBeInTheDocument();
  });
  test("checks for the People link", () => {
    // Arrange
    render(
      <Router>
        <AdminSideBar />
      </Router>
    );
    // Act
    const linkElement = screen.getByText(/People/);
    // Assert
    expect(linkElement).toBeInTheDocument();
  });
  test("checks for the Events link", () => {
    // Arrange
    render(
      <Router>
        <AdminSideBar />
      </Router>
    );
    // Act
    const linkElement = screen.getByText(/Events/);
    // Assert
    expect(linkElement).toBeInTheDocument();
  });
});
