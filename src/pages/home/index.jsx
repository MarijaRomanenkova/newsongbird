import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Categories from 'features/game-categories';
import CorrectAnswer from 'features/correctAnswer/index.jsx';
import AnswerOptions from 'features/anwer-options-list';
import GameOver from 'features/gameover';
import Loader from 'shared/ui/button/loader/loader.component';
import {
  selectIsGameOver,
  selectIsQuestionaryDataLoading,
  getFirstQuizAnswear,
  selectCorrectAnswerObject,
} from 'widgets/gameSlice';

import styles from './index.module.scss';

function Home() {
  const isQuestionaryDataLoading = useSelector(selectIsQuestionaryDataLoading);
  const isGameOver = useSelector(selectIsGameOver);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFirstQuizAnswear());
  }, []);

  if (isQuestionaryDataLoading || !selectCorrectAnswerObject) {
    return <Loader />;
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
