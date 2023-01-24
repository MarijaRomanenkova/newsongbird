import React from 'react';
import { useSelector } from 'react-redux';

import Categories from 'features/game/categories';
import CorrectAnswer from 'features/game/correctAnswer';
import AnswerOptions from 'features/game/answerOptions';
import GameOver from 'features/game/gameOver';
import { selectIsGameOver } from 'features/game/gameSlice';

function Game() {
  const isGameOver = useSelector(selectIsGameOver);
  return (
    <>
      {isGameOver && <GameOver />}
      {!isGameOver && (
        <>
          <Categories />
          <CorrectAnswer />
          <AnswerOptions />
        </>
      )}
    </>
  );
}

export default Game;
