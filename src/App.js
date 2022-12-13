import React, { useContext } from 'react';

import Header from 'components/header/header.component';
import Categories from 'components/categories/categories.component';
import CorrectAnswer from 'components/correctAnswer/correctAnswer.component';
import AnswerOptions from 'components/answerOptions/answerOptions.component';
import GameOver from 'components/gameOver/gameOver.component';
import { QuizContext } from 'contexts/quizContext';

import styles from './App.module.scss';

function App() {
  const [QuizState] = useContext(QuizContext);
  const { isGameOver } = QuizState;

  return (
    <div className={styles.App_Container}>
      <Header />
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
export default App;
