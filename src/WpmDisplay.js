import * as React from "react";
import {calculateWpm} from "./utils/typingUtils";

export function WpmDisplay(props) {
    return <div><span>WPM: </span>{calculateWpm(props.startTime, props.endTime, props.wordCount)}</div>;
}