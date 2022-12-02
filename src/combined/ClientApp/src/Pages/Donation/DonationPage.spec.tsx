import * as React from 'react';
import {  render, RenderResult, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import { DonationPage } from './DonationPage';

let documentBody: RenderResult;

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe('Donation Page', () => {
    beforeEach(() => {
      documentBody = render(<DonationPage/>);
    })

    it('Load Donation page and check for page content', () => {
        expect(screen.getByTestId('donationPageHeader')).toBeInTheDocument
    });

});