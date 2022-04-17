import * as React from "react";
import {Simulate} from "react-dom/test-utils";
import {cleanup, render} from "react-testing-library";
import {TypingArea} from "../TypingArea";

describe('TypingArea', function () {
  function type(char: string, input: HTMLInputElement) {
    input.value += char;
    Simulate.change(input);
  }

  it('should show other players current position', function () {
    const container = render(<TypingArea
      text='The Text.'
      currentPosition={0}
      playerPositions={{'joe': 0, 'adam': 1}}
    />);

    container.getByText('joe');
  });

  afterEach(cleanup);
});
