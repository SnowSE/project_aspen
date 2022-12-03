import * as React from 'react';
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import CreateEventPage from './CreateEventPage';


jest.mock("axios");

describe('Create Event Page', () => {
    beforeEach(()=> {
      render(<CreateEventPage/>);

    })

    it('Check that create event form is not in page', () => {
        const EventForm = screen.queryByTestId("CreateEventForm")
        const NotAdmin = screen.queryByTestId("NotAdminForm")

        expect(EventForm).not.toBeInTheDocument()
        expect(NotAdmin).toBeInTheDocument()


    });





});