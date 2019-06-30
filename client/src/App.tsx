import * as React from 'react';
import {useEffect, useState} from 'react';
import './App.scss';
import {TypeArea} from "./TypeArea";
import {emit, subscribe} from "./utils/eventHandlers";

export default function App() {
  const [text, setText] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    subscribe('game start', setText);
  }, []);

  const handleJoinClick = () => {
    setHasJoined(true);
    emit('player join', name);
  };

  const handleNameInputChange = (e: any) => {
    setName(e.target.value);
  };

  return (
    <div className="App">
      {hasJoined ?
        <>
          <button onClick={() => emit('start')}>Start Game</button>
          <TypeArea
            text={text}
          />
        </>
        :
        <div className='name-entry'>
          <label htmlFor="name-input">Enter Your Name</label>
          <div>
            <input value={name} type='text' id='name-input' onChange={handleNameInputChange}/>
          </div>
          <button onClick={handleJoinClick}>Join</button>
        </div>
      }
    </div>
  );
}