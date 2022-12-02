import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App, { EventContext } from './App'

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

describe('App.tsx tests', () => {
    beforeEach(() => {
        render(<App />);
    })

    test('App.tsx renders', () => {
        var temp = expect(EventContext.Provider).toBeInTheDocument
        console.log("App.tsx:" + temp)
    });
    

});