import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./Footer"

describe("Footer tests", ()=>{
    test('Should confirm logo appears', () => {
        render(
            <Router>
              <Footer />
            </Router>
          );
          // Act
     
          const logoElement = screen.getByRole('img');
          expect(logoElement).toHaveAttribute('src', 'tempLogo.png');
          expect(logoElement).toHaveAttribute('alt', 'logo');
    });
    test("checks for the Our Story link", () => {
        // Arrange
        render(
          <Router>
            <Footer />
          </Router>
        );
        // Act
        const linkElement = screen.getByText(/Our Story/);
        // Assert
        console.log(linkElement)
        expect(linkElement).toBeInTheDocument();
      });

      test("checks for the About Us link", () => {
        // Arrange
        render(
          <Router>
            <Footer />
          </Router>
        );
        // Act
        const linkElement = screen.getByText(/About Us/);
        // Assert
        expect(linkElement).toBeInTheDocument();
      });
      test("checks for the Calendar link", () => {
        // Arrange
        render(
          <Router>
            <Footer />
          </Router>
        );
        // Act
        const linkElement = screen.getByText(/Calendar/);
        // Assert
        expect(linkElement).toBeInTheDocument();
      });

      test("checks for the Contact Us link", () => {
        // Arrange
        render(
          <Router>
            <Footer />
          </Router>
        );
        // Act
        const linkElement = screen.getByText(/Contact Us/);
        // Assert
        expect(linkElement).toBeInTheDocument();
      });

      test("checks for the copyright text", () => {
        // Arrange
        render(
          <Router>
            <Footer />
          </Router>
        );
        // Act
        const linkElement = screen.getByText(/© 2021 Copyright, All Rights Reserved/);
        // Assert
        expect(linkElement).toBeInTheDocument();
      });
    
})