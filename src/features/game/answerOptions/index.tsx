import React, { useState, useEffect } from 'react';
import { useSound } from 'use-sound';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';

import {
  selectCorrectAnswerID,
  selectIsGameOver,
  switchToNextLevel,
  correctAnswerChosen,
  answerWasChosen,
  selectBirdsData,
  selectCurrentLevel,
} from 'features/game/gameSlice';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import correctAnswerChosenSoundOGG from 'shared/assets/sounds/correctAnswerChosenSound.ogg';
import incorrectAnswerChosenSoundOGG from 'shared/assets/sounds/incorrectAnswerChosenSound.ogg';
import AnswerOptionDetails from 'features/game/answerOptionDetails/index';
import Circle from 'shared/ui/circle/index';
import Button from 'shared/ui/button/index';
import { Option } from 'shared/interfaces';

import styles from './index.module.scss';

function AnswerOptions(): JSX.Element {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const currentLevel = useAppSelector(selectCurrentLevel);
  const birdsData = useAppSelector(selectBirdsData);
  const correctAnswerID = useAppSelector(selectCorrectAnswerID);
  const isGameOver = useAppSelector(selectIsGameOver);

  const [playCorrectAnswerChosenSound] = useSound(correctAnswerChosenSoundOGG);
  const [playIncorrectAnswerChosenSound] = useSound(
    incorrectAnswerChosenSoundOGG
  );
  const [isNextButtonDisabled, setIsNextButtonDisabled] =
    useState<boolean>(true);
  const [currentCategoryOptions, setCurrentCategoryOptions] = useState<
    Option[]
  >([]);
  const [currentChosenAnswer, setCurrentChosenAnswer] = useState<Option>();

  const { language } = i18n;
  const currentCategoryOptionsByLanguage = birdsData[language];

  const findCurrentLevelOptionsByIndex = (
    level: Option[],
    index: number
  ): boolean => index === currentLevel;

  const findChosenAnswerById = (id: number) => {
    const result = currentCategoryOptions.find(
      (option: Option): boolean => option.id === id
    );
    return result;
  };

  let thisCategoryOptionsByLanguage: Option[] = [];

  if (currentCategoryOptionsByLanguage && currentLevel) {
    thisCategoryOptionsByLanguage = currentCategoryOptionsByLanguage.find(
      (category: Option[], index: number) =>
        findCurrentLevelOptionsByIndex(category, index)
    );
  }

  if (thisCategoryOptionsByLanguage.length > 0 && correctAnswerID) {
    thisCategoryOptionsByLanguage = thisCategoryOptionsByLanguage.map(
      (option: Option) => {
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
      }
    );
  }

  const touchedCategoryOptions = (id: number): Option[] => {
    const Options: Option[] = currentCategoryOptions.map(
      (option: Option): Option => {
        if (option.id === id) {
          return { ...option, isTouched: true };
        }
        return { ...option };
      }
    );
    return Options;
  };

  useEffect(() => {
    if (currentLevel && thisCategoryOptionsByLanguage.length > 1) {
      setCurrentCategoryOptions(thisCategoryOptionsByLanguage);
    }
  }, [currentLevel, currentCategoryOptionsByLanguage]);

  const handleAnswerOptionClick = (id: number): void => {
    setCurrentChosenAnswer(findChosenAnswerById(id));
    if (!isNextButtonDisabled) {
      return;
    }
    dispatch(answerWasChosen());
    setCurrentCategoryOptions(touchedCategoryOptions(id));

    if (id === correctAnswerID) {
      dispatch(correctAnswerChosen());
      playCorrectAnswerChosenSound();
      if (!isGameOver) {
        setIsNextButtonDisabled(false);
      }
    }
    playIncorrectAnswerChosenSound();
  };

  const handleNextButtonClick = () => {
    setIsNextButtonDisabled(true);
    dispatch(switchToNextLevel());
  };
  console.log('currentCategoryOptions', currentCategoryOptions);
  return (
    <>
      <div className={styles.AnswerOptions_Container}>
        <div className={styles.AnswerOptionsList_Container}>
          {currentCategoryOptions &&
            currentCategoryOptions.map((option: Option) => (
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

        {currentChosenAnswer && (
          <AnswerOptionDetails
            currentChosenAnswerName={currentChosenAnswer.name}
            currentChosenAnswerImage={currentChosenAnswer.image}
            currentChosenAnswerDescription={currentChosenAnswer.description}
            currentChosenAnswerAudio={currentChosenAnswer.audio}
            currentChosenAnswerSpecies={currentChosenAnswer.species}
          />
        )}
        {!currentChosenAnswer?.id && (
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
        isDisabled={isNextButtonDisabled}
        handleClick={handleNextButtonClick}
        text={t('next-level')}
      />
    </>
  );
}
export default AnswerOptions;
