import * as React from "react";
import './TypeArea.scss';
import {WpmDisplay} from "./WpmDisplay";
import {INITIAL_HP} from "./utils/constants";
import {emit, subscribe} from "./utils/eventHandlers";

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
        <div className='metrics'>
            <div>
                <div>HP: {currentHealth}</div>

                {startTime &&
                <div>
                    <WpmDisplay startTime={startTime} endTime={new Date()} wordCount={wordCount}/>
                </div>
                }
            </div>
            <div className='players'>
                {Object.keys(players).map((id) =>
                    <div key={id}>
                        Player: {id}
                        <ul>
                            <li>HP: {players[id].hp}</li>
                        </ul>
                    </div>
                )
                }
            </div>
        </div>
    </div>;
}
