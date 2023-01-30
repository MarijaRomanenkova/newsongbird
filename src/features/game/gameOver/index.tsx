import React from 'react';
import Confetti from 'react-confetti';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { useTranslation } from 'react-i18next';

import { MAXIMUM_SCORE_PER_LEVEL } from 'features/game/gameSettings';
import {
  resetTheGame,
  selectCurrentLevel,
  selectScore,
} from 'features/game/gameSlice';
import Button from 'shared/ui/button';

import styles from './index.module.scss';

const GameOver = (): JSX.Element => {
  const currentLevel = useAppSelector(selectCurrentLevel);
  const score = useAppSelector(selectScore);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const MAXIMUM_TOTAL_SCORE: number = MAXIMUM_SCORE_PER_LEVEL * currentLevel;

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
            isDisabled={false}
            handleClick={() => dispatch(resetTheGame())}
            name={t('game-over-button')}
          />
        </>
      )}
    </div>
  );
};

export default GameOver;
