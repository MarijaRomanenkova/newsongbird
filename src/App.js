/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';

import { QuizContext } from 'contexts/QuizContext';
import Header from 'components/header/header.component';
import Categories from 'components/categories/categories.component';
import Question from 'components/question/question.component';
import AnswerOptions from 'components/answerOptions/answerOptions.component';
import GameOver from 'components/gameOver/gameOver.component';

import styles from './App.module.scss';

function App() {
  const [QuizState] = useContext(QuizContext);
  const { isGameOver } = QuizState;
  return (
    <div className={styles.App_Container}>
      {!isGameOver ? (
        <>
          <Header />
          <Categories />
          <Question />
          <AnswerOptions />
        </>
      ) : (
        <GameOver />
      )}
    </div>
  );
}
export default App;
