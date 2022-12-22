import React, { useContext } from 'react';

import { QuizContext } from 'contexts/quizContext';

import styles from './score.module.scss';

function Score() {
  const [QuizState] = useContext(QuizContext);
  const { score } = QuizState;

  return (
    <div className={styles.Score}>
      <p> Score: {score}</p>
    </div>
  );
}

export default Score;
