import * as React from "react";
import {calculateWpm} from "./utils/typingUtils";

interface Props {
  startTime: Date;
  endTime: Date;
  wordCount: number;
}

export function WpmDisplay(props: Props) {
  return <div className='wpm-container'>
    <span>WPM: </span>{calculateWpm(props.startTime, props.endTime, props.wordCount)}
  </div>;
}