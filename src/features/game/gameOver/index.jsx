import React from 'react';
import Confetti from 'react-confetti';
import { useSelector, useDispatch } from 'react-redux';

import { MAXIMUM_SCORE_PER_LEVEL } from 'features/game/gameSettings';
import {
  resetTheGame,
  selectCurrentLevel,
  selectScore,
} from 'features/game/gameSlice';
import Button from 'shared/ui/button';

import styles from './index.module.scss';

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
        Вы прошли викторину и набрали {score} из {MAXIMUM_TOTAL_SCORE} возможных
        баллов
      </h5>

      {score < MAXIMUM_TOTAL_SCORE && (
        <>
          <h5 className={styles.GameOver_Text}>Попробуете набрать больше?</h5>
          <Button
            bolean={false}
            type="button"
            handleClick={() => dispatch(resetTheGame())}
            name="Попробовать еще раз!"
          />
        </>
      )}
    </div>
  );
}

export default GameOver;
