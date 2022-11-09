import * as React from 'react';
import { getByTestId, render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Home} from './Home'

let documentBody: RenderResult;

describe('Home Page', () => {
    beforeEach(() => {
      documentBody = render(<Home/>);
    })

    it('Load Photo Page, Click on Add Photo, Click Close', () => {

    });

    it('Load Photo Page, Click on Add Photo, Fill in Correct Info, Click Save', () => {

    });
});