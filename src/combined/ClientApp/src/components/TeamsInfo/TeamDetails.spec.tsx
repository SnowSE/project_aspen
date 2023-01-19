//import {render, screen, waitFor } from '@testing-library/react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
//import userEvent from '@testing-library/user-event';
//import { TeamDetails } from './TeamDetails';
import { Home } from '../../Pages/Home/Home';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

describe('Team Details Page', () => {
    beforeEach(() => {
      render(<Home/>);
    })

    it('Load TeamDetailsPage and check for page content', async () => {
        // var lintErrorFix = expect(screen.getByTestId('TeamDetailsPageHeader')).toBeInTheDocument
        // lintErrorFix = expect(screen.getByTestId('TeamDonationTarget')).toBeInTheDocument
        // lintErrorFix = expect(screen.getByTestId('TeamImage')).toBeInTheDocument
        // lintErrorFix = expect(screen.getByTestId('shareModal')).toBeInTheDocument
        // lintErrorFix = expect(screen.getByTestId('ProgressBar')).toBeInTheDocument
        // lintErrorFix = expect(screen.getByTestId('TeamDescription')).toBeInTheDocument
        // lintErrorFix = expect(screen.getByTestId('TeamExpandContent')).toBeInTheDocument

        // lintErrorFix =  expect(screen.getByTestId('NumberOfMembers')).not.toBeInTheDocument
        // lintErrorFix =  expect(screen.getByTestId('MembersHeader')).not.toBeInTheDocument
        // lintErrorFix =  expect(screen.getByTestId('ListOfMembers')).not.toBeInTheDocument

        // userEvent.click(screen.getByTestId('TeamExpandContent'))
        // await waitFor(() => screen.getByTestId('homePageTeamInfoModal'))
        // lintErrorFix = expect(screen.getByTestId('NumberOfMembers')).toBeInTheDocument
        // lintErrorFix = expect(screen.getByTestId('MembersHeader')).toBeInTheDocument
        // lintErrorFix = expect(screen.getByTestId('ListOfMembers')).toBeInTheDocument

        // console.log('Load TeamDetails and check for page content:', lintErrorFix)
    });
});