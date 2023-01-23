/* eslint-disable object-shorthand */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Confetti from 'react-confetti';

import { MAXIMUM_SCORE_PER_LEVEL } from 'gameSettings/gameSettings';
import { resetTheGame, selectCurrentLevel, selectScore } from 'store/gameSlice';

import styles from './gameOver.module.scss';

function GameOver() {
  const currentLevel = useSelector(selectCurrentLevel);
  const score = useSelector(selectScore);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const MAXIMUM_TOTAL_SCORE = MAXIMUM_SCORE_PER_LEVEL * currentLevel;

  return (
    <div className={styles.GameOver_Container}>
      <Confetti className={styles.Confetti} gravity={0.09} />
      <h1 className={styles.Gamever_Title}>{t('game-over-title')}</h1>
      <h5 className={styles.GameOver_Text}>
        {t('game-over-text', {
          score: score,
          MAXIMUM_TOTAL_SCORE: MAXIMUM_TOTAL_SCORE,
        })}
      </h5>

      {score < MAXIMUM_TOTAL_SCORE && (
        <>
          <h5 className={styles.GameOver_Text}>{t('game-over-text-2')}</h5>
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
