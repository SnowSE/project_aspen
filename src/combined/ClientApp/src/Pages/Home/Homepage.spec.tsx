import * as React from 'react';
import { getByTestId, render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import {Home} from './Home'

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

    it('Load Homepage and check for header', () => {
        expect(screen.getByTestId('homePageHeader')).toBeInTheDocument;

    });
});