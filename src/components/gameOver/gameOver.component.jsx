import React from 'react';
import Confetti from 'react-confetti';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { MAXIMUM_SCORE_PER_LEVEL } from 'gameSettings/gameSettings';
import { resetTheGame, selectCurrentLevel, selectScore } from 'store/gameSlice';

import styles from './gameOver.module.scss';

function GameOver() {
  const currentLevel = useSelector(selectCurrentLevel);
  const score = useSelector(selectScore);
  const dispatch = useDispatch();

  const MAXIMUM_TOTAL_SCORE = MAXIMUM_SCORE_PER_LEVEL * currentLevel;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  return (
    <div className={styles.GameOver_Container}>
      <Confetti width={windowWidth} height={windowHeight} />
      <h1 className={styles.GameOver_Title}>Поздравляем!</h1>
      <h5 className={styles.GameOver_Text}>
      <FormattedMessage id="gameOver_text" defaultMessage=" Next Level" />
        Вы прошли викторину и набрали {score} из {MAXIMUM_TOTAL_SCORE} возможных
        баллов
      </h5>

      {score < MAXIMUM_TOTAL_SCORE && (
        <>
          <h5 className={styles.GameOver_Text}>Попробуете набрать больше?</h5>
          <button
            className={styles.GameOver_Btn}
            type="button"
            onClick={() => dispatch(resetTheGame())}
          >
            Попробовать еще раз!
          </button>
        </>
      )}
    </div>
  );
}

export default GameOver;
