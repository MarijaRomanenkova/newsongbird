/* eslint-disable prefer-destructuring */
/* eslint-disable no-inner-declarations */
import React, { useEffect, useState } from 'react';
import { useSound } from 'use-sound';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import correctAnswerChosenSoundOGG from 'assets/sounds/correctAnswerChosenSound.ogg';
import incorrectAnswerChosenSoundOGG from 'assets/sounds/incorrectAnswerChosenSound.ogg';
import AnswerOptionDetails from 'components/answerOptionDetails/answerOptionDetails.component';
import Circle from 'components/circle/circle.component';
import NextButton from 'components/nextButton/nextButton.component';
import {
  selectCorrectAnswerID,
  selectCurrentChosenAnswer,
  selectIsGameOver,
  switchToNextLevel,
  correctAnswerChosen,
  answerWasChosen,
  selectBirdsData,
  selectCurrentLevel,
} from 'store/gameSlice';
import { useTranslation } from 'react-i18next';

import styles from './answerOptions.module.scss';

function AnswerOptions() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const language = i18n.language;

  const birdsData = useSelector(selectBirdsData);
  const currentLevel = useSelector(selectCurrentLevel);

  const [currentCategoryOptions, setCurrentCategoryOptions] = useState(
    birdsData[language][currentLevel]
  );

  const correctAnswerID = useSelector(selectCorrectAnswerID);
  const currentChosenAnswer = useSelector(selectCurrentChosenAnswer);
  const isGameOver = useSelector(selectIsGameOver);

  const [playCorrectAnswerChosenSound] = useSound(correctAnswerChosenSoundOGG);
  const [playIncorrectAnswerChosenSound] = useSound(
    incorrectAnswerChosenSoundOGG
  );

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  useEffect(() => {
    setCurrentCategoryOptions(() =>
      currentCategoryOptions.map((option) => {
        if (option.id === correctAnswerID) {
          return {
            ...option,
            uniqueID: nanoid(),
            isTouched: false,
            isCorrectAnswer: true,
          };
        }
        return {
          ...option,
          uniqueID: nanoid(),
          isTouched: false,
          isCorrectAnswer: false,
        };
      })
    );
  }, [currentLevel]);

  function handleAnswerOptionClick(id) {
    if (!isNextButtonDisabled) {
      return;
    }
    dispatch(answerWasChosen(id));
    setCurrentCategoryOptions(() =>
      currentCategoryOptions.map((option) => {
        if (option.id === id) {
          return { ...option, isTouched: true };
        }
        return { ...option };
      })
    );
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
