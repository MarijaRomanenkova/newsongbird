import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Confetti from 'react-confetti';

import { MAXIMUM_SCORE_PER_LEVEL } from 'gameSettings/gameSettings';
import { resetTheGame, selectCurrentLevel, selectScore } from 'store/gameSlice';

import styles from './gameOver.module.scss';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

function GameOver() {
  const currentLevel = useSelector(selectCurrentLevel);
  const score = useSelector(selectScore);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const MAXIMUM_TOTAL_SCORE = MAXIMUM_SCORE_PER_LEVEL * currentLevel;

  return (
    <div className={styles.GameOver_Container}>
      <Confetti width={windowWidth} height={windowHeight} />
      <h1 className={styles.Gamever_Title}>{t('game-over-title')}</h1>
      <h5 className={styles.GameOver_Text}>{t('game-over-text')}</h5>

      {score < MAXIMUM_TOTAL_SCORE && (
        <>
          <h5 className={styles.GameOver_Text}>{t('game-over-trxt-2')}</h5>
          <button
            className={styles.GameOver_Btn}
            type="button"
            onClick={() => dispatch(resetTheGame())}
          >
            {t('game-over-button')}
          </button>
        </>
      )}
    </div>
  );
}

export default GameOver;
