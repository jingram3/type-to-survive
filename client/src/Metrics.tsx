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
        {Object.keys(props.players).map((id) =>
          <div key={id}>
            Player: {id}
            <ul>
              <li>HP: {props.players[id].hp}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
