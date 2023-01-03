import React from 'react';
import { useSelector } from 'react-redux';

import Categories from 'features/categories/categories.component';
import CorrectAnswer from 'features/correctAnswer/correctAnswer.component';
import AnswerOptions from 'features/answerOptions/answerOptions.component';
import GameOver from 'features/gameOver/gameOver.component';
import { selectIsGameOver } from 'widgets/game/gameSlice';

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
