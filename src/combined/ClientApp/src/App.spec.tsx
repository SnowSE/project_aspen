import * as React from 'react';
import { render, RenderResult} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App, { EventContext } from './App'

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