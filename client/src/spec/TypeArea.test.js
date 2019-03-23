import * as React from "react";
import {TypeArea} from "../TypeArea";
import {cleanup, render} from "react-testing-library";
import {Simulate} from 'react-dom/test-utils';
import {INITIAL_HP} from "../utils/constants";

describe('TypeArea', function () {
    function type(char, input) {
        input.value += char;
        Simulate.change(input);
    }

    function testHp(hp, container) {
        container.getByText("HP: " + hp);
    }

    const sampleText = 'Some text here.';

    it('should clear the input when a character is entered', function () {
        const container = render(<TypeArea text={sampleText}/>);
        const input = container.getByTestId('text-input');

        type('S', input);
        expect(input.value).toEqual('S');

        type('o', input);
        expect(input.value).toEqual('o');
    });

    it('should highlight completed characters', function () {
        const container = render(<TypeArea text={sampleText}/>);
        const input = container.getByTestId('text-input');
        type('S', input);
        type('o', input);
        type('l', input);

        expect(document.getElementsByClassName('completed').length).toEqual(2);
    });

    it('should only display WPM once player has started typing', function () {
        const container = render(<TypeArea text={sampleText}/>);

        expect(container.queryByText("WPM:")).toBe(null);

        const input = container.getByTestId('text-input');
        type('S', input);

        container.getByText("WPM:");
    });

    it('should subtract from a player\'s health when they mistype', function () {
        const container = render(<TypeArea text={sampleText}/>);

        testHp(INITIAL_HP, container);

        const input = container.getByTestId('text-input');
        type('x', input);

        testHp(INITIAL_HP - 1, container);
    });

    it('should not subtract from a player\'s health when they type correctly', function () {
        const container = render(<TypeArea text={sampleText}/>);

        testHp(INITIAL_HP, container);

        const input = container.getByTestId('text-input');
        type('S', input);

        testHp(INITIAL_HP, container);
    });

    it('should not subtract from a player\'s health when they mistype consecutively', function () {
        const container = render(<TypeArea text={sampleText}/>);

        testHp(INITIAL_HP, container);

        const input = container.getByTestId('text-input');
        type('x', input);
        type('x', input);

        testHp(INITIAL_HP - 1, container);
    });

    afterEach(cleanup);
});
