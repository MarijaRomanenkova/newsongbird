import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import GameOver from 'components/gameOver/gameOver.component';
import { selectIsGameOver } from 'store/gameSlice';

import Loader from 'components/loader/loader.component';

const Categories = lazy(() =>
  import('components/categories/categories.component')
);
const CorrectAnswer = lazy(() =>
  import('components/correctAnswer/correctAnswer.component')
);
const AnswerOptions = lazy(() =>
  import('components/answerOptions/answerOptions.component')
);

function Game() {
  const isGameOver = useSelector(selectIsGameOver);

  return (
    <>
      {isGameOver && <GameOver />}
      {!isGameOver && (
        <Suspense fallback={<Loader />}>
          <>
            <Categories />
            <CorrectAnswer />
            <AnswerOptions />
          </>
        </Suspense>
      )}
    </>
  );
}

export default Game;
