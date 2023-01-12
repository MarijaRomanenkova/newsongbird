/* eslint-disable no-inner-declarations */
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSound } from 'use-sound';
import { useSelector, useDispatch } from 'react-redux';

import correctAnswerChosenSoundOGG from 'assets/sounds/correctAnswerChosenSound.ogg';
import incorrectAnswerChosenSoundOGG from 'assets/sounds/incorrectAnswerChosenSound.ogg';
import AnswerOptionDetails from 'components/answerOptionDetails/answerOptionDetails.component';
import Circle from 'components/circle/circle.component';
import NextButton from 'components/nextButton/nextButton.component';
import {
  selectCurrentCategoryOptions,
  selectCorrectAnswerID,
  selectCurrentChosenAnswer,
  selectIsGameOver,
  switchToNextLevel,
  correctAnswerChosen,
  answerWasChosen,
} from 'store/gameSlice';

import styles from './answerOptions.module.scss';

function AnswerOptions() {
  const dispatch = useDispatch();

  const currentCategoryOptions = useSelector(selectCurrentCategoryOptions);
  const correctAnswerID = useSelector(selectCorrectAnswerID);
  const currentChosenAnswer = useSelector(selectCurrentChosenAnswer);
  const isGameOver = useSelector(selectIsGameOver);

  const [playCorrectAnswerChosenSound] = useSound(correctAnswerChosenSoundOGG);
  const [playIncorrectAnswerChosenSound] = useSound(
    incorrectAnswerChosenSoundOGG
  );

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  function handleAnswerOptionClick(id) {
    if (!isNextButtonDisabled) {
      return;
    }
    dispatch(answerWasChosen(id));
    if (id === correctAnswerID) {
      dispatch(correctAnswerChosen());
      playCorrectAnswerChosenSound();
      if (!isGameOver) {
        setIsNextButtonDisabled(false);
      }
    }
    playIncorrectAnswerChosenSound();
  }

  const handleNextButtonClick = () => {
    setIsNextButtonDisabled(true);
    dispatch(switchToNextLevel());
  };

  return (
    <>
      <div className={styles.AnswerOptions_Container}>
        <div className={styles.AnswerOptionsList_Container}>
          {currentCategoryOptions.map((option) => (
            <button
              key={option.uniqueID}
              className={styles.AnswerOptionsList_Option}
              type="button"
              onClick={() => handleAnswerOptionClick(option.id)}
              disabled={!isNextButtonDisabled}
            >
              <Circle
                isTouched={option.isTouched}
                isCorrectAnswer={option.isCorrectAnswer}
              />
              {option.name}
            </button>
          ))}
        </div>

        {currentChosenAnswer.id && (
          <AnswerOptionDetails
            name={currentChosenAnswer.name}
            image={currentChosenAnswer.image}
            description={currentChosenAnswer.description}
            audio={currentChosenAnswer.audio}
            species={currentChosenAnswer.species}
          />
        )}
        {!currentChosenAnswer.id && (
          <div className={styles.AnswerOptionDetails_Dummy}>
            <h4>
              <FormattedMessage
                id="game-rules-text"
                defaultMessage="Listen to the song."
                className={styles.AnswerOptionDetails_Dummy_Text}
              />
            </h4>
            <h4>
              <FormattedMessage
                id="game-rules-text-2"
                defaultMessage="Select answer. "
                className={styles.AnswerOptionDetails_Dummy_Text}
              />
            </h4>
          </div>
        )}
      </div>
      <NextButton
        isNextButtonDisabled={isNextButtonDisabled}
        isGameOver={isGameOver}
        handleNextButtonClick={handleNextButtonClick}
      />
    </>
  );
}

export default AnswerOptions;
