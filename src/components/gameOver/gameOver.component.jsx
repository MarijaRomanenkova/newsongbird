import React, { useContext } from 'react';
import Confetti from 'react-confetti';

import { QuizContext } from 'contexts/quizContext';
import { MAXIMUM_SCORE_PER_LEVEL } from 'gameSettings/gameSettings';

import styles from './gameOver.module.scss';

function GameOver() {
  const [QuizState, dispatch] = useContext(QuizContext);
  const { score, currentLevel } = QuizState;
  const MAXIMUM_TOTAL_SCORE = MAXIMUM_SCORE_PER_LEVEL * currentLevel;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  return (
    <div className={styles.GameOver_Container}>
      <Confetti width={windowWidth} height={windowHeight} />
      <h1 className={styles.GameOver_Title}>Поздравляем!</h1>
      <h5 className={styles.GameOver_Text}>
        Вы прошли викторину и набрали {score} из {MAXIMUM_TOTAL_SCORE} возможных
        баллов
      </h5>

      {score < MAXIMUM_TOTAL_SCORE && (
        <>
          <h5 className={styles.GameOver_Text}>Попробуете набрать больше?</h5>
          <button
            className={styles.GameOver_Btn}
            type="button"
            onClick={() => dispatch({ type: 'NEW_GAME' })}
          >
            Попробовать еще раз!
          </button>
        </>
      )}
    </div>
  );
}
export default GameOver;
