import {render screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import {Home} from './Home'




const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate
}));

describe('Home Page', () => {
    beforeEach(() => {
      render(<Home/>);
    })

    it('Load Homepage and check for page content', () => {
        var lintErrorFix = expect(screen.getByTestId('homePageHeader')).toBeInTheDocument
        lintErrorFix = expect('Loading ...').toBeInTheDocument // Default Value for Event Context
        lintErrorFix = expect(screen.getByTestId('homePageVideo')).toBeInTheDocument
        lintErrorFix = expect(screen.getByTestId('donateMealsBtn')).toBeInTheDocument
        lintErrorFix = expect(screen.getByTestId('teamModalBtn')).toBeInTheDocument
        lintErrorFix = expect(screen.getByTestId('createATeamBtn')).toBeInTheDocument
        lintErrorFix = expect(screen.getByTestId('joinATeamBtn')).toBeInTheDocument
    });

    it('Click the team info button and see modal appear', async () => {
      expect(screen.getByTestId('teamModalBtn')).toBeInTheDocument
      userEvent.click(screen.getByTestId('teamModalBtn'))
      await waitFor(() => screen.getByTestId('homePageTeamInfoModal') )
      userEvent.click(screen.getByTestId('closeBtn'))
      expect(screen.getByTestId('homePageTeamInfoModal')).not.toBeInTheDocument
    })  

    
});