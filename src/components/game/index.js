import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameOver from 'components/gameOver/gameOver.component';
import {
  selectIsGameOver,
  selectLanguage,
  getBirdsData,
  selectURL
} from 'store/gameSlice';

import Categories from 'components/categories/categories.component';
import CorrectAnswer from 'components/correctAnswer/correctAnswer.component';
import AnswerOptions from 'components/answerOptions/answerOptions.component';

function Game() {
  const dispatch = useDispatch();
  const isGameOver = useSelector(selectIsGameOver);
  const language = useSelector(selectLanguage);
  const url = useSelector(selectURL);

  useEffect(() => {
    dispatch(getBirdsData(url));
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
