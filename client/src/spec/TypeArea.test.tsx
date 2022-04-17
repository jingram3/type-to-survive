import * as React from "react";
import {TypeArea} from "../TypeArea";
import {cleanup, render, RenderResult} from "@testing-library/react";
import {Simulate} from 'react-dom/test-utils';
import {INITIAL_HP} from "../utils/constants";
import * as io from 'socket.io-client';
import {Player} from "../models/Player";

jest.mock('socket.io-client');

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

  it('should clear typed characters in the input when the word ends', function () {
    const container = render(<TypeArea text={'So I.?!'}/>);
    const input = getInput(container);

    type('S', input);
    expect(input.value).toEqual('S');

    type('o', input);
    expect(input.value).toEqual('So');

    type(' ', input);
    expect(input.value).toEqual('');

    type('I', input);
    expect(input.value).toEqual('I');
    type('.', input);
    expect(input.value).toEqual('');
    type('?', input);
    expect(input.value).toEqual('');
    type('!', input);
    expect(input.value).toEqual('');
  });

  it('should not include the typed character when mistyped', function () {
    const container = render(<TypeArea text={sampleText}/>);
    const input = getInput(container);

    type('S', input);
    expect(input.value).toEqual('S');
    type('x', input);
    expect(input.value).toEqual('S');
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

  it('should display GAME OVER when only 1 active player is left', function () {
    const container = render(<TypeArea text={sampleText}/>);

    expect(container.queryByText('GAME OVER')).toBeNull();

    // @ts-ignore
    io.emit('player change', {
      '1234': {
        hasLost: false,
        hp: 20,
        name: '1234'
      } as Player,
      'abcd': {
        hasLost: true,
        hp: 0,
        name: 'abcd'
      } as Player,
    });

    container.getByText('GAME OVER');
    container.getByText('1234 Wins!');
  });

  it('should not display GAME OVER when only 1 player exists', function () {
    const container = render(<TypeArea text={sampleText}/>);

    // @ts-ignore
    io.emit('player change', {
      '1234': {
        hasLost: false,
        hp: 20,
        name: '1234'
      } as Player
    });

    expect(container.queryByText('GAME OVER')).toBeNull();
  });

  afterEach(cleanup);
});
