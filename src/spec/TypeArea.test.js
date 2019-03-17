import * as React from "react";
import {TypeArea} from "../TypeArea";
import {cleanup, render} from "react-testing-library";
import {Simulate} from 'react-dom/test-utils';

describe('TypeArea', function () {
    function type(char, input) {
        input.value += char;
        Simulate.change(input);
    }

    it('should clear the input when a character is entered', function () {
        const container = render(<TypeArea text={'Some text here.'}/>);
        const input = container.getByTestId('text-input');

        type('S', input);
        expect(input.value).toEqual('S');

        type('o', input);
        expect(input.value).toEqual('o');
    });

    it('should highlight completed characters', function () {
        const container = render(<TypeArea text={'Some text here.'}/>);
        const input = container.getByTestId('text-input');
        type('S', input);
        type('o', input);
        type('l', input);

        expect(document.getElementsByClassName('completed').length).toEqual(2);
    });

    it('should only display WPM once player has started typing', function () {
        const container = render(<TypeArea text={'Some text here.'}/>);

        expect(container.queryByText("WPM:")).toBe(null);

        const input = container.getByTestId('text-input');
        type('S', input);

        container.getByText("WPM:");
    });

    afterEach(cleanup);
});
