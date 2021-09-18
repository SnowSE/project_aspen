import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {initialState} from "../store/initialState";
import { ApplicationState } from '../store';

const middleware = [thunk];
const mockStore = configureStore<ApplicationState>(middleware);

test('📱 renders without crashing 💥', () => {
    const storeFake = (state: any) => ({
        default: () => {},
        subscribe: () => {},
        dispatch: () => {},
        getState: () => ({ ...state })
    });
    //const store = storeFake({}) as any;
    const store = mockStore(initialState);

    ReactDOM.render(
        <Provider store={store}>
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        </Provider>, document.createElement('div'));
});
