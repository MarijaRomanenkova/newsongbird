import React, { useContext } from 'react';

import Categories from 'components/categories/categories.component';
import CorrectAnswer from 'components/correctAnswer/correctAnswer.component';
import AnswerOptions from 'components/answerOptions/answerOptions.component';
import GameOver from 'components/gameOver/gameOver.component';
import { QuizContext } from 'contexts/quizContext';

import styles from './home.module.scss';

function Home() {
  const [QuizState] = useContext(QuizContext);
  const { isGameOver } = QuizState;

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
