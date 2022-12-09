/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import Confetti from 'react-confetti';
import { QuizContext } from 'contexts/QuizContext';
import styles from 'components/gameOver/gameOver.module.scss';

function GameOver() {
  const [QuizState, dispatch] = useContext(QuizContext);
  const { score } = QuizState;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  return (
    <div className={styles.GameOver_Container }>
      <Confetti width={windowWidth} height={windowHeight} />
      <h1 className={styles.GameOver_Title}>Поздравляем!</h1>
      <h5 className={styles.GameOver_Text}>
        Вы прошли викторину и набрали {score} из 30 возможных баллов
      </h5>
      {/* TODO: redo static 29 and 30. use appropriate variables using MAXIMUM_SCORE_VALUE * all correctAnsweraries */}
      {/* TODO: remove everewhere ' ' -> if this not needed */}
      <h5 className={score < 29 ? styles.GameOver_Text : styles.Hidden}>
        Попробуете набрать больше?{' '}
      </h5>
      <button
        className={score < 29 ? styles.GameOver_Btn : styles.Hidden}
        type="button"
        onClick={() => dispatch({ type: 'NEW_GAME' })}
      >
        Попробовать еще раз!
      </button>
    </div>
  );
}
export default GameOver;
