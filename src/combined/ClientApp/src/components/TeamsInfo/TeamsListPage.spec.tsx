import * as React from 'react';
import ReactDOM from 'react-dom';
import { getByTestId, render, RenderResult, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import {TeamsListPage} from './TeamsListPage'
import { useNavigate } from 'react-router-dom';

let documentBody: RenderResult;

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe('Teams List Page', () => {
    beforeEach(() => {
      documentBody = render(<TeamsListPage/>);
    })

    it('Load TeamsListPage and check for page content', () => {

    });

    it('Click the team info button and see modal appear', async () => {

    })  

    
});