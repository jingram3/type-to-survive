import * as React from "react";
import {TypeArea} from "../TypeArea";
import {cleanup, render, RenderResult} from "react-testing-library";
import {Simulate} from 'react-dom/test-utils';
import {INITIAL_HP} from "../utils/constants";

describe('TypeArea', function () {
  function type(char: string, input: HTMLInputElement) {
    input.value += char;
    Simulate.change(input);
  }

  function testHp(hp: number, container: RenderResult) {
    container.getByText("HP: " + hp);
  }

  function getInput(container: RenderResult) {
    return container.getByTestId('text-input') as HTMLInputElement;
  }

  const sampleText = 'Some text here.';

  it('should show only the most recent character when typed', function () {
    const container = render(<TypeArea text={sampleText}/>);
    const input = getInput(container);

    type('S', input);
    expect(input.value).toEqual('S');

    type('o', input);
    expect(input.value).toEqual('o');
  });

  it('should clear the input when mistyped', function () {
    const container = render(<TypeArea text={sampleText}/>);
    const input = getInput(container);

    type('S', input);
    expect(input.value).toEqual('S');
    type('x', input);
    expect(input.value).toEqual('');
  });

  it('should highlight completed characters', function () {
    const container = render(<TypeArea text={sampleText}/>);
    const input = getInput(container);
    type('S', input);
    type('o', input);
    type('l', input);

    expect(document.getElementsByClassName('completed').length).toEqual(2);
  });

  it('should only display WPM once player has started typing', function () {
    const container = render(<TypeArea text={sampleText}/>);

    expect(container.queryByText("WPM:")).toBe(null);

    const input = getInput(container);
    type('S', input);

    container.getByText("WPM:");
  });

  it('should subtract from a player\'s health when they mistype', function () {
    const container = render(<TypeArea text={sampleText}/>);

    testHp(INITIAL_HP, container);

    const input = getInput(container);
    type('x', input);

    testHp(INITIAL_HP - 1, container);
  });

  it('should not subtract from a player\'s health when they type correctly', function () {
    const container = render(<TypeArea text={sampleText}/>);

    testHp(INITIAL_HP, container);

    const input = getInput(container);
    type('S', input);

    testHp(INITIAL_HP, container);
  });

  it('should not subtract from a player\'s health when they mistype consecutively', function () {
    const container = render(<TypeArea text={sampleText}/>);

    testHp(INITIAL_HP, container);

    const input = getInput(container);
    type('x', input);
    type('x', input);

    testHp(INITIAL_HP - 1, container);
  });

  afterEach(cleanup);
});
