import * as React from "react";
import './TypeArea.scss';
import {INITIAL_HP} from "./utils/constants";
import {emit, subscribe} from "./utils/eventHandlers";
import {Metrics} from "./Metrics";

function getStyledText(text, currentIndex) {
    return [...text].map((char, i) =>
        <span key={i} className={i <= currentIndex - 1 ? 'completed' : ''}>{char}</span>
    );
}

export function TypeArea(props) {
    const {useState, useEffect} = React;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [currentHealth, setCurrentHealth] = useState(INITIAL_HP);
    const [startTime, setStartTime] = useState();
    const [mistyped, setMistyped] = useState(false);
    const [players, setPlayers] = useState({});

    useEffect(() => {
        subscribe('player change', (players) => {
            setPlayers(players);
        });
    }, []);

    useEffect(() => {
        emit('request players');
    }, []);

    const handleTextInputChange = (e) => {
        if (!startTime) {
            setStartTime(new Date());
        }

        let value = e.target.value;
        const currentChar = value[value.length - 1];

        if (currentChar === props.text[currentIndex]) {
            setMistyped(false);
            setCurrentIndex(currentIndex + 1);

            if (currentChar === " ") {
                setWordCount(wordCount + 1);
            }
        } else {
            if (!mistyped) {
                setCurrentHealth(currentHealth - 1);
                emit('mistype');
            }

            setMistyped(true);
        }

        e.target.value = currentChar || "";
    };

    return <div className='type-area-outer'>
        <div className='type-area'>
            <div className='text'>
                {getStyledText(props.text, currentIndex)}
            </div>
            <div>
                <input
                    type='text'
                    data-testid="text-input"
                    onChange={handleTextInputChange}
                    className={mistyped ? "error" : ""}
                />
            </div>
        </div>
        <Metrics
            startTime={startTime}
            wordCount={wordCount}
            players={players}
            currentHealth={currentHealth}
        />
    </div>;
}
