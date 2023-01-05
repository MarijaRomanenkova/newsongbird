import React from 'react';
import { useSelector } from 'react-redux';
import GameOver from 'components/gameOver/gameOver.component';
import { selectIsGameOver } from 'store/gameSlice';

import Categories from 'components/categories/categories.component';
import CorrectAnswer from 'components/correctAnswer/correctAnswer.component';
import AnswerOptions from 'components/answerOptions/answerOptions.component';

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
