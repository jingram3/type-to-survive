import * as React from "react";
import './TypeArea.scss';
import {WpmDisplay} from "./WpmDisplay";

function getStyledText(text, currentIndex) {
    return [...text].map((char, i) =>
        <span key={i} className={i <= currentIndex - 1 ? 'completed' : ''}>{char}</span>
    );
}

export function TypeArea(props) {
    const {useState} = React;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [startTime, setStartTime] = useState();

    const handleTextInputChange = (e) => {
        if (!startTime) {
            setStartTime(new Date());
        }

        let value = e.target.value;
        const currentChar = value[value.length - 1];

        if (currentChar === props.text[currentIndex]) {
            setCurrentIndex(currentIndex + 1);

            if (currentChar === " ") {
                setWordCount(wordCount + 1);
            }
        }

        e.target.value = currentChar || "";
    };

    return <div className='type-area'>
        <div className='text'>
            {getStyledText(props.text, currentIndex)}
        </div>
        <div>
            <input
                type='text'
                data-testid="text-input"
                onChange={handleTextInputChange}
            />
        </div>
        {startTime && <WpmDisplay startTime={startTime} endTime={new Date()} wordCount={wordCount} />}
    </div>;
}
