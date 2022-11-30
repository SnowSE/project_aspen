import * as React from 'react';
import ReactDOM from 'react-dom';
import { getByTestId, render, RenderResult, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import App, { EventContext } from './App'
import { useNavigate } from 'react-router-dom';

let documentBody: RenderResult;

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

describe('App.tsx tests', () => {
    beforeEach(() => {
        documentBody = render(<App />);
    })

    test('App.tsx renders', () => {
        expect(EventContext.Provider).toBeInTheDocument
    });
    

});