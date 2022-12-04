import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import CreateEventPage from './CreateEventPage';
import CreateEventForm from '../../components/Event/CreateEventForm';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';



describe('Create Event Page ', () => {
    beforeEach(() => {
        render(<CreateEventPage />);
    })

    it('Check that create event form is not in page', () => {
        const EventForm = screen.queryByTestId("CreateEventForm")
        const NotAdmin = screen.queryByTestId("NotAdminResult")

        expect(EventForm).not.toBeInTheDocument()
        expect(NotAdmin).toBeInTheDocument()
    });

});


describe('Check input change', () => {
    beforeEach(() => {

        render(<BrowserRouter>
            <CreateEventForm />
        </BrowserRouter>
        )
    })

    it('Check that form is submittable', async () => {

        const eventTitleInput = screen.getByTestId('eventTitleInput') as HTMLInputElement
        await userEvent.type(eventTitleInput, 'Snow Event')
        
        const eventLocationInput = screen.getByTestId('eventLocationInput') as HTMLInputElement
        await userEvent.type(eventLocationInput, 'Snow College')
        
        const eventDescriptionInput = screen.getByTestId('eventDescriptionInput') as HTMLInputElement
        await userEvent.type(eventDescriptionInput, 'Snow College event description')
        
        const eventDonationGoalInput = screen.getByTestId('eventDonationGoalInput') as HTMLInputElement
        await userEvent.type(eventDonationGoalInput, '45')
        
        const eventDateInput = screen.getByTestId('eventDateInput') as HTMLInputElement
        await userEvent.type(eventDateInput, '2022-11-09T00:41:37.022Z')
        
        const submitButton = screen.getByRole('button')
        

        expect(eventTitleInput.value).toEqual('Snow Event')
        expect(eventLocationInput.value).toEqual('Snow College')
        expect(eventDescriptionInput.value).toEqual('Snow College event description')
        expect(eventDonationGoalInput.value).toEqual('45')
        // expect(eventDateInput.value).toEqual('2022-11-09T00:41:37.022Z')
        expect(submitButton).not.toBeDisabled()
    })

    it('Check that form is NOT submittable', async () => {

        const eventTitleInput = screen.getByTestId('eventTitleInput') as HTMLInputElement
        await userEvent.type(eventTitleInput, 'Snow Event')
        
        const eventLocationInput = screen.getByTestId('eventLocationInput') as HTMLInputElement
        await userEvent.type(eventLocationInput, 'Snow College')
        
        const eventDescriptionInput = screen.getByTestId('eventDescriptionInput') as HTMLInputElement
        await userEvent.type(eventDescriptionInput, 'Snow College event description')
        
        const submitButton = screen.getByRole('button')
        

        expect(eventTitleInput.value).toEqual('Snow Event')
        expect(eventLocationInput.value).toEqual('Snow College')
        expect(eventDescriptionInput.value).toEqual('Snow College event description')
        expect(submitButton).toBeDisabled()
    })
});

