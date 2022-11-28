import * as React from 'react';
import ReactDOM from 'react-dom';
import { getByTestId, render, RenderResult, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import {Home} from './Home'
import { useNavigate } from 'react-router-dom';

let documentBody: RenderResult;

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe('Home Page', () => {
    beforeEach(() => {
      documentBody = render(<Home/>);
    })

    it('Load Homepage and check for page content', () => {
        expect(screen.getByTestId('homePageHeader')).toBeInTheDocument
        expect('Loading ...').toBeInTheDocument // Default Vaule for Event Context
        expect(screen.getByTestId('homePageVideo')).toBeInTheDocument
        //expect(screen.getByTestId('homePageProgressBar')).toBeInTheDocument
        expect(screen.getByTestId('donateMealsBtn')).toBeInTheDocument
        expect(screen.getByTestId('teamModalBtn')).toBeInTheDocument
        expect(screen.getByTestId('createATeamBtn')).toBeInTheDocument
        expect(screen.getByTestId('joinATeamBtn')).toBeInTheDocument
    });

    it('Click the team info button and see modal appear', async () => {
      expect(screen.getByTestId('teamModalBtn')).toBeInTheDocument
      userEvent.click(screen.getByTestId('teamModalBtn'))
      await waitFor(() => screen.getByTestId('homePageTeamInfoModal') )
      userEvent.click(screen.getByTestId('closeBtn'))
      expect(screen.getByTestId('homePageTeamInfoModal')).not.toBeInTheDocument
    })  

    
});