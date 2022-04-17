import * as React from 'react';
import {emit, subscribe} from "./utils/eventHandlers";
import {TypeArea} from "./TypeArea";
import {useState} from "react";
import {useEffect} from "react";

interface Props {

}

export function GameArea(props: Props) {
  const [text, setText] = useState('');

  useEffect(() => {
    subscribe('game start', setText);
  }, []);

  return (
    <>
      <button onClick={() => emit('start')}>Start Game</button>
      <TypeArea
        text={text}
      />
    </>
  );
}