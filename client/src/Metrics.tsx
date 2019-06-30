import * as React from "react";
import './TypeArea.scss';
import {WpmDisplay} from "./WpmDisplay";
import {Player} from "./models/Player";

interface Props {
  startTime: Date;
  currentHealth: number;
  wordCount: number;
  players: { [id: string]: Player };
}

export function Metrics(props: Props) {
  return (
    <div className='metrics'>
      <div>
        <div>HP: {props.currentHealth}</div>

        {props.startTime &&
        <div>
          <WpmDisplay
            startTime={props.startTime}
            endTime={new Date()}
            wordCount={props.wordCount}
          />
        </div>
        }
      </div>
      <div className='players'>
        {Object.entries(props.players).map(([id, player]) =>
          <div key={id}>
            <div>Player: {player.name}</div>
            <ul>
              <li>HP: {player.hp}</li>
              <li>Has Lost: {player.hasLost ? "Yes" : "No"}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
