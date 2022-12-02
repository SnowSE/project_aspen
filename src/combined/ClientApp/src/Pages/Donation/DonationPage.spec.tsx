import {  render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import { DonationPage } from './DonationPage';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe('Donation Page', () => {
    beforeEach(() => {
      render(<DonationPage/>);
    })

    it('Load Donation page and check for page content', () => {
        var lintErrorFix = expect(screen.getByTestId('donationPageHeader')).toBeInTheDocument
        console.log('Load Donation page and check for page content:', lintErrorFix)
    });

});