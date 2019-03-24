import * as React from "react";
import './TypeArea.scss';
import {WpmDisplay} from "./WpmDisplay";

export function Metrics(props) {
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
