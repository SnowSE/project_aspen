import { render, screen } from "@testing-library/react";
import AdminEvents from "./AdminEvents";

jest.mock("../../components/Events/EventList", () => () => "mocked eventlist");

describe("Admin Event Managment Page", () => {
  test("renders add new event button", () => {
    // Arrange
    render(<AdminEvents />);
    // Act
    const desiredElement = screen.getByText(/Add Event/);
    // Assert
    expect(desiredElement).toBeInTheDocument();
    expect(desiredElement.nodeType).toBeDefined();
  });
});
