import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
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

  const MAXIMUM_TOTAL_SCORE = MAXIMUM_SCORE_PER_LEVEL * currentLevel;

  return (
    <div className={styles.GameOver_Container}>
      <Confetti width={windowWidth} height={windowHeight} />
      <h1 className={styles.Gamever_Title}>
        <FormattedMessage
          id="game-over-title"
          defaultMessage="Congratulations!"
        />
      </h1>
      <h5 className={styles.GameOver_Text}>
        <FormattedMessage
          id="game-over-text"
          defaultMessage="You got {score} of {MAXIMUM_TOTAL_SCORE} possible point!"
          values={{
            score: <b>{score}</b>,
            MAXIMUM_TOTAL_SCORE: <b>{MAXIMUM_TOTAL_SCORE}</b>,
          }}
        />
      </h5>

      {score < MAXIMUM_TOTAL_SCORE && (
        <>
          <h5 className={styles.GameOver_Text}>
            <FormattedMessage
              id="game-over-text-2"
              defaultMessage="Would you like to try again? "
            />
          </h5>
          <button
            className={styles.GameOver_Btn}
            type="button"
            onClick={() => dispatch(resetTheGame())}
          >
            <FormattedMessage
              id="game-over-button"
              defaultMessage=" Try again"
            />
          </button>
        </>
      )}
    </div>
  );
}

export default GameOver;
