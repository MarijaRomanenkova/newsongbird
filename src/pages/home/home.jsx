import React from 'react';
import { useSelector } from 'react-redux';

import Categories from 'components/categories/categories.component';
import CorrectAnswer from 'components/correctAnswer/correctAnswer.component';
import AnswerOptions from 'components/answerOptions/answerOptions.component';
import GameOver from 'components/gameOver/gameOver.component';
import { selectIsGameOver } from 'store/gameSlice';

import styles from './home.module.scss';

function Home() {
  const isGameOver = useSelector(selectIsGameOver);

  return (
    <div className={styles.Game_Container}>
      {isGameOver ? (
        <GameOver />
      ) : (
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
