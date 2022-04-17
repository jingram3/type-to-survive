import * as React from 'react';

interface Props {
  text: string;
  currentPosition: number;
  playerPositions: { [name: string]: number }
}


export function TypingArea(props: Props) {
  function getStyledText(text: string, currentIndex: number) {
    return [...text].map((char, i) => {
      const namesAtPosition = Object.entries(props.playerPositions)
        .filter(([key, value]) => value === i)
        .map(([key, value]) => key);

      return (
        <span
          key={i}
          className={'char ' + (i <= currentIndex - 1 ? 'completed' : (i === currentIndex ? 'next-char' : ''))}
        >
      {char}
          {namesAtPosition.length > 0 &&
          <span className='player-position'>{namesAtPosition[0]}</span>}
    </span>
      );
    });
  }


  return (
    <div className='text'>
      {getStyledText(props.text, props.currentPosition)}
    </div>
  );
}