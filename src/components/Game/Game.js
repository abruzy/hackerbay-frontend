/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';

import randomPoints from '../../utils/randomPoints';

import Square from '../Square/Square';

const Game = props => {
  const [valX, setValX] = useState(null);
  const [valY, setValY] = useState(null);

  const xP = Math.floor(valX / 2) - 1;
  const yP = Math.floor(valY / 2) - 1;

  const [x, setX] = useState('');
  const [y, setY] = useState('');

  useEffect(() => {
    if (valX && valY) {
      setX(xP);
      setY(yP);
    }
  }, [valX, valY, xP, yP]);

  useEffect(() => {
    const valueX = prompt('Please enter board Width');
    const valueY = prompt('Please enter board height');

    if (valueX > 3 && valueY > 3 && valueX === valueY) {
      setValX(parseInt(valueX, 10));
      setValY(parseInt(valueY, 10));
    } else {
      alert('Invalid parameter supplied!, please try again');
      props.endGame();
    }
  }, []);

  const [xCord, setXCord] = useState([]);
  const [yCord, setYCord] = useState([]);

  const arr = [];
  for (let i = 0; i < valX; i += 1) {
    arr.push([]);
    for (let j = 0; j < valY; j += 1) {
      arr[i][j] = null;
    }
  }

  useEffect(() => {
    if (valX && valY) {
      const xCord = randomPoints(valX, valX);
      const yCord = randomPoints(valY, valX);
      setXCord(xCord);
      setYCord(yCord);
    }
  }, [xP, yP, valX, valY]);

  const score = useRef(0);

  useEffect(() => {
    function handleKey(e) {
      switch (e.key) {
        case 'ArrowRight':
          if (x < (valX - 1)) {
            score.current += 1;
            setX(x + 1);
          }
          break;
        case 'ArrowLeft':
          if (x > 0) {
            score.current += 1;
            setX(x - 1);
          }
          break;
        case 'ArrowUp':
          if (y > 0) {
            score.current += 1;
            setY(y - 1);
          }
          break;
        case 'ArrowDown':
          if (y < (valY - 1)) {
            score.current += 1;
            setY(y + 1);
          }
          break;
        default:
          break;
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [y, x, valX, valY]);

  const [alp, gh] = useState([]);

  useEffect(() => {
    const array1 = [];

    if (valX) {
      for (let i = 0; i < valX; i += 1) {
        array1.push(i);
      }
      array1.fill(<img className="img" src="/images/sprite.jpg" alt="sprite" />);
      gh(array1);
    }
  }, [valX]);

  const tracker = useRef(0);

  if (xCord.length > 0) {
    for (let i = 0; i < xCord.length; i += 1) {
      arr[xCord[i]][yCord[i]] = <div key={i}>{[alp[i]]}</div>;
    }

    for (let i = 0; i < xCord.length; i += 1) {
      if (x === yCord[i] && y === xCord[i]) {
        alp[i] = <p className="me" key={i}>Faa</p>;
        tracker.current += 1;
      }
    }
  }

  if (xCord.length > 0 && tracker.current === xCord.length) {
    setTimeout(() => {
      alert(`Game over, You completed game in ${score.current} moves`);
      props.endGame();
    });
  }

  if ((x && y) || (x === 0) || (y === 0)) {
    arr[y][x] = <img className="img" src="/images/player.jpg" alt="player" />;
  }

  return (
    <div>

      {valX && valY
        ? arr.map((item, i) => (
          <Square data={item} key={i} />
        ))
        : 'Loading...'}
    </div>

  );
};

export default Game;
