import * as React from 'react';
import {useEffect, useState} from 'react';
import './App.css';
import {TypeArea} from "./TypeArea";
import {emit, subscribe} from "./utils/eventHandlers";

export default function App() {
  const [text, setText] = useState('');
  // const [winner, setWinner] = useState('');

  useEffect(() => {
    subscribe('game start', setText);
  }, []);

  // useEffect(() => {
  //   subscribe('game end', setWinner);
  // }, []);

  return (
    <div className="App">
      {/*{winner && <h1>{winner} Wins!</h1>}*/}
      <button onClick={() => emit('start')}>Start Game</button>
      <TypeArea
        text={text}
      />
    </div>
  );
}