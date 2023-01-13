/* eslint-disable no-inner-declarations */
import React, { useState } from 'react';
import { useSound } from 'use-sound';
import { useSelector, useDispatch } from 'react-redux';

import correctAnswerChosenSoundOGG from 'shared/assets/sounds/correctAnswerChosenSound.ogg';
import incorrectAnswerChosenSoundOGG from 'shared/assets/sounds/incorrectAnswerChosenSound.ogg';
import AnswerOptionDetails from 'features/game/answerOptionDetails/index';
import Circle from 'shared/ui/circle/index';
import NextButton from 'features/nextButton/index';
import {
  selectCurrentCategoryOptions,
  selectCorrectAnswerID,
  selectCurrentChosenAnswer,
  selectIsGameOver,
  switchToNextLevel,
  correctAnswerChosen,
  answerWasChosen,
} from 'features/game/gameSlice';

import styles from './index.module.scss';

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
            <h4 className={styles.AnswerOptionDetails_Dummy_Text}>
              Послушайте плеер.
            </h4>
            <h4 className={styles.AnswerOptionDetails_Dummy_Text}>
              Выберите птицу из списка
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
