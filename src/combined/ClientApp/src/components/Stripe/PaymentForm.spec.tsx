import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import PaymentForm from './PaymentForm';
import { EventContext } from '../../App';
import { Elements } from '@stripe/react-stripe-js';

jest.mock('./EventContext', () => ({
    useContext: jest.fn(),
}));

//describe('PaymentForm', () => {
//    it('renders without crashing', () => {
//        useContext.mockReturnValue({
//            currentEvent: {},
//            loading: false,
//        });

//        render(
//            <Elements stripe={null}>
//                <PaymentForm />
//            </Elements>
//        );

//        expect(screen.getByText(/PaymentForm/i)).toBeInTheDocument();
//    });
//});
