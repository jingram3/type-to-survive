import * as React from "react";
import './TypeArea.scss';
import {INITIAL_HP} from "./utils/constants";
import {emit, subscribe} from "./utils/eventHandlers";
import {Metrics} from "./Metrics";
import {Player} from "./models/Player";
import {TypingArea} from "./TypingArea";

interface Props {
  text: string;
}

export function TypeArea(props: Props) {
  const {useState, useEffect} = React;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [currentHealth, setCurrentHealth] = useState(INITIAL_HP);
  const [startTime, setStartTime] = useState();
  const [mistyped, setMistyped] = useState(false);
  const [players, setPlayers] = useState<{ [id: string]: Player }>({});
  const [winner, setWinner] = useState<Player | null>(null);

  useEffect(() => {
    subscribe('player change', (newPlayers: { [id: string]: Player }) => {
      setPlayers(newPlayers);

      const activePlayers = Object.values(newPlayers).filter((player) => !player.hasLost);

      if (activePlayers.length == 1 && Object.keys(newPlayers).length > 1) {
        setWinner(activePlayers[0]);
      }
    });
  }, []);

  useEffect(() => {
    emit('request players');
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [props.text]);

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) {
      setStartTime(new Date());
    }

    let value = e.target.value;
    const currentChar = value[value.length - 1];
    const wordEnders = ' .?!';

    if (currentChar === props.text[currentIndex]) {
      emit('type');
      setMistyped(false);
      setCurrentIndex(currentIndex + 1);

      if (wordEnders.includes(currentChar)) {
        setWordCount(wordCount + 1);

        e.target.value = '';
      }
    } else {
      if (!mistyped) {
        setCurrentHealth(currentHealth - 1);
        emit('mistype');
      }

      setMistyped(true);

      e.target.value = e.target.value.substring(0, e.target.value.length - 1);
    }
  };

  const playerPositions: { [name: string]: number } = {};
  Object.entries(players).forEach(([key, value]) => {
    playerPositions[value.name] = value.currentIndex;
  });

  return (
    <div className='type-area-outer' data-testid='type-area'>
      <div className='type-area'>
        <TypingArea
          text={props.text}
          currentPosition={currentIndex}
          playerPositions={playerPositions}
        />
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
      {winner !== null &&
      <div>
        <div>GAME OVER</div>
        <div>{winner.name} Wins!</div>
      </div>
      }
    </div>
  );
}
