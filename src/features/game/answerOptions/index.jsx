/* eslint-disable no-inner-declarations */
import React, { useState, useEffect } from 'react';
import { useSound } from 'use-sound';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import correctAnswerChosenSoundOGG from 'shared/assets/sounds/correctAnswerChosenSound.ogg';
import incorrectAnswerChosenSoundOGG from 'shared/assets/sounds/incorrectAnswerChosenSound.ogg';
import AnswerOptionDetails from 'features/game/answerOptionDetails/index';
import Circle from 'shared/ui/circle/index';
import Button from 'shared/ui/button/index';
import {
  selectCorrectAnswerID,
  selectIsGameOver,
  switchToNextLevel,
  correctAnswerChosen,
  answerWasChosen,
  selectBirdsData,
  selectCurrentLevel,
} from 'features/game/gameSlice';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

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

  const { language } = i18n;
  const currentCategoryOptionsByLanguage = birdsData[language];
  function findCurrentLevelByIndex(option, index) {
    return index === currentLevel;
  }

  useEffect(() => {
    if (currentLevel && currentCategoryOptionsByLanguage) {
      setCurrentCategoryOptions(
        currentCategoryOptionsByLanguage
          .find((option, index) => findCurrentLevelByIndex(option, index))
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
  }, [currentLevel, currentCategoryOptionsByLanguage]);

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
      <Button
        bolean={isGameOver}
        isDisabled={isNextButtonDisabled}
        handleClick={handleNextButtonClick}
        name={t('next-level')}
        type="button"
      />
    </>
  );
}

export default AnswerOptions;
