import * as React from 'react';
import {useEffect, useState} from 'react';
import './App.scss';
import {TypeArea} from "./TypeArea";
import {emit, subscribe} from "./utils/eventHandlers";
import {GameArea} from "./GameArea";

export default function App() {
  const [hasJoined, setHasJoined] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = () => {
    setHasJoined(true);
    emit('player join', name);
  };

  const handleNameInputChange = (e: any) => {
    setName(e.target.value);
  };

  return (
    <div className="App">
      {hasJoined ?
        <GameArea/>
        :
        <form className='name-entry' onSubmit={handleSubmit}>
          <label htmlFor="name-input">Enter Your Name</label>
          <div>
            <input value={name} type='text' id='name-input' onChange={handleNameInputChange}/>
          </div>
          <button type='submit'>Join</button>
        </form>
      }
    </div>
  );
}