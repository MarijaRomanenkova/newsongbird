/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
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
  const { t, i18n } = useTranslation();

  const currentLevel = useSelector(selectCurrentLevel);
  const birdsData = useSelector(selectBirdsData);
  const correctAnswerID = useSelector(selectCorrectAnswerID);
  const isGameOver = useSelector(selectIsGameOver);

  const [playCorrectAnswerChosenSound] = useSound(correctAnswerChosenSoundOGG);
  const [playIncorrectAnswerChosenSound] = useSound(
    incorrectAnswerChosenSoundOGG
  );
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [currentCategoryOptions, setCurrentCategoryOptions] = useState([]);
  const [currentChosenAnswer, setCurrentChosenAnswer] = useState({});

  const language = i18n.language;
  const dataByLanguage = birdsData[language];

  function findByIndex(option, index) {
    return index === currentLevel;
  }

  useEffect(() => {
    if (currentLevel && dataByLanguage) {
      setCurrentCategoryOptions(
        dataByLanguage
          .find((option, index) => findByIndex(option, index))
          .map((option) => {
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
    }
  }, [currentLevel, dataByLanguage]);

  function handleAnswerOptionClick(id) {
    setCurrentChosenAnswer(
      currentCategoryOptions.find((option) => option.id === id)
    );
    if (!isNextButtonDisabled) {
      return;
    }
    dispatch(answerWasChosen(id));
    setCurrentCategoryOptions(
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
          {dataByLanguage &&
            currentLevel &&
            currentCategoryOptions.map((option) => (
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
              {t('game-rules-text')}
            </h4>
            <h4 className={styles.AnswerOptionDetails_Dummy_Text}>
              {t('game-rules-text-2')}
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
