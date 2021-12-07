import { render, screen } from '@testing-library/react';
import DonationPage from './DonationPage';

jest.mock("../components/Donations/DonationForm", () => () => <form>Test Form</form>);

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    eventid: 4,
    teamid: 1
  })
}))

describe("Donation Page View", () => {
  test("renders Donation Header", () => {
    // Arrange
    render(<DonationPage />);
    // Act
    const desiredElement = screen.getByText(/Donations/);
    // Assert
    expect(desiredElement).toBeInTheDocument()
  });
  test('should render a mocked form', () => {
    // Arrange
    render(<DonationPage />);
    // Act
    const desiredElement = screen.getByText(/Test Form/);
    // Assert
    expect(desiredElement).toBeInTheDocument()
  })
  
});