import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Categories from 'components/categories/categories.component';
import CorrectAnswer from 'components/correctAnswer/correctAnswer.component';
import AnswerOptions from 'components/answerOptions/answerOptions.component';
import GameOver from 'components/gameOver/gameOver.component';
import {
  selectIsGameOver,
  selectIsQuestionaryDataLoading,
  getFirstQuizAnswear,
  selectCurrentCorrectAnswerObject,
} from 'store/gameSlice';

import styles from './home.module.scss';

function Home() {
  const isQuestionaryDataLoading = useSelector(selectIsQuestionaryDataLoading);
  const isGameOver = useSelector(selectIsGameOver);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFirstQuizAnswear());
  }, []);

  if (isQuestionaryDataLoading || !selectCurrentCorrectAnswerObject) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className={styles.Game_Container}>
      {isGameOver && <GameOver />}
      {!isGameOver && (
        <>
          <Categories />
          <CorrectAnswer />
          <AnswerOptions />
        </>
      )}
    </div>
  );
}

export default Home;
