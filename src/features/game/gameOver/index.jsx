import React from 'react';
import Confetti from 'react-confetti';
import { useTranslation } from 'react-i18next';

import { MAXIMUM_SCORE_PER_LEVEL } from 'features/game/gameSettings';
import {
  resetTheGame,
  selectCurrentLevel,
  selectScore,
} from 'features/game/gameSlice';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import Button from 'shared/ui/button/index';

import styles from './index.module.scss';

function GameOver() {
  const currentLevel = useAppSelector(selectCurrentLevel);
  const score = useAppSelector(selectScore);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const MAXIMUM_TOTAL_SCORE = MAXIMUM_SCORE_PER_LEVEL * currentLevel;

  return (
    <div className={styles.GameOver_Container}>
      <Confetti className={styles.Confetti} gravity={0.09} />
      <h1 className={styles.Gamever_Title}>{t('game-over-title')}</h1>
      <h5 className={styles.GameOver_Text}>
        {t('game-over-text', {
          score,
          MAXIMUM_TOTAL_SCORE,
        })}
      </h5>

      {score < MAXIMUM_TOTAL_SCORE && (
        <>
          <h5 className={styles.GameOver_Text}>{t('game-over-text-2')}</h5>
          <Button
            isHidden={false}
            type="button"
            handleClick={() => dispatch(resetTheGame())}
            text={t('game-over-button')}
          />
        </>
      )}
    </div>
  );
}

export default GameOver;
