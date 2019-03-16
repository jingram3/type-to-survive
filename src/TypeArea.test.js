import * as React from "react";
import {TypeArea} from "./TypeArea";
import {cleanup, render} from "react-testing-library";
import {Simulate} from 'react-dom/test-utils';

describe('TypeArea', function () {
    it('should clear the input when a character is entered', function () {
        const container = render(<TypeArea text={'Some text here.'}/>);
        const input = container.getByTestId('text-input');
        input.value = 'S';
        Simulate.change(input);
        expect(input.value).toEqual('S');
        input.value = 'So';
        Simulate.change(input);
        expect(input.value).toEqual('o');
    });

    it('should highlight completed characters', function () {
        const container = render(<TypeArea text={'Some text here.'}/>);
        const input = container.getByTestId('text-input');
        input.value = 'S';
        Simulate.change(input);
        input.value = 'o';
        Simulate.change(input);
        input.value = 'l';
        Simulate.change(input);

        expect(document.getElementsByClassName('completed').length).toEqual(2);
    });

    afterEach(cleanup);
});
