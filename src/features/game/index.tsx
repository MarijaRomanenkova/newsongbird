import React from 'react';
import { useAppSelector } from 'app/hooks';

import Categories from 'features/game/categories';
import CorrectAnswer from 'features/game/correctAnswer';
import AnswerOptions from 'features/game/answerOptions';
import GameOver from 'features/game/gameOver';
import { selectIsGameOver } from 'features/game/gameSlice';

function Game(): JSX.Element {
  const isGameOver = useAppSelector(selectIsGameOver);
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
