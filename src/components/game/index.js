import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameOver from 'components/gameOver/gameOver.component';
import {
  selectIsGameOver,
  selectLanguage,
  getBirdsData,
} from 'store/gameSlice';

import Categories from 'components/categories/categories.component';
import CorrectAnswer from 'components/correctAnswer/correctAnswer.component';
import AnswerOptions from 'components/answerOptions/answerOptions.component';

function Game() {
  const dispatch = useDispatch();
  const isGameOver = useSelector(selectIsGameOver);
  const language = useSelector(selectLanguage);

  useEffect(() => {
    dispatch(getBirdsData());
  }, [language]);

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
