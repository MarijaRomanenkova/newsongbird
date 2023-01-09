import React from 'react';
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

  return (
    <div className={styles.GameOver_Container}>
      <h1 className={styles.Gamever_Title}>
        <FormattedMessage
          id="game-over_title"
          defaultMessage="Congratulations!"
        />
      </h1>
      <h5 className={styles.GameOver_Text}>
        <FormattedMessage
          id="game-over_text"
          defaultMessage="You got {score} of {MAXIMUM_TOTAL_SCORE} possible point!"
          values={{ score: <b>{score}</b> , MAXIMUM_TOTAL_SCORE: <b>{MAXIMUM_TOTAL_SCORE}</b> }}
        />
      </h5>

      {score < MAXIMUM_TOTAL_SCORE && (
        <>
          <h5 className={styles.GameOver_Text}>
            <FormattedMessage
              id="game-over_text2"
              defaultMessage="Would you like to try again? "
            />
          </h5>
          <button
            className={styles.GameOver_Btn}
            type="button"
            onClick={() => dispatch(resetTheGame())}
          >
            <FormattedMessage
              id="game-over_button"
              defaultMessage=" Try again"
            />
          </button>
        </>
      )}
    </div>
  );
}

export default GameOver;
