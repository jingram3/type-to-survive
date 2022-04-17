import * as React from 'react';
import {Metrics} from "../Metrics";
import {render} from "@testing-library/react";
import {Player} from "../models/Player";

describe('Metrics', () => {
  it('should show the info about a player', function () {
    const player: Player = {
      name: 'Joe',
      hp: 50,
      hasLost: false,
      currentIndex: 0
    };

    const container = render(<Metrics
      startTime={new Date()}
      currentHealth={50}
      wordCount={0}
      players={{'abc123': player}}
    />);

    container.getByText('Player: Joe');
    container.getByText('HP: 50');
    container.getByText('Has Lost: No');
  });
});