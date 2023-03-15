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
  selectLanguage,
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
  const dataLanguage = useAppSelector(selectLanguage);

  const { language } = i18n;
  const currentCategoryOptionsByLanguage = birdsData[dataLanguage];

  const [playCorrectAnswerChosenSound] = useSound(correctAnswerChosenSoundOGG);
  const [playIncorrectAnswerChosenSound] = useSound(incorrectAnswerChosenSoundOGG);

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState<boolean>(true);
  const [currentCategoryOptions, setCurrentCategoryOptions] = useState<Option[]>([]);
  const [thisCategoryOptionsByLanguage, setThisCategoryOptionsByLanguage] = useState<
    Option[]
  >([]);
  const [currentChosenAnswer, setCurrentChosenAnswer] = useState<Option>();

  const findChosenAnswerById = (id: number) => {
    const result = currentCategoryOptions.find(
      (option: Option): boolean => option.id === id
    );
    return result;
  };

  useEffect(() => {
    if (currentCategoryOptionsByLanguage && currentLevel) {
      setThisCategoryOptionsByLanguage(
        currentCategoryOptionsByLanguage.find(
          (level: Option[], index: number): boolean => index === currentLevel
        )
      );
    }
  }, [currentCategoryOptionsByLanguage, currentLevel]);

  useEffect(() => {
    if (correctAnswerID > 0) {
      setCurrentCategoryOptions(
        thisCategoryOptionsByLanguage.map((option: Option) => {
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
  }, [thisCategoryOptionsByLanguage, correctAnswerID]);

  const handleAnswerOptionClick = (id: number): void => {
    setCurrentChosenAnswer(findChosenAnswerById(id));
    if (!isNextButtonDisabled) {
      return;
    }
    dispatch(answerWasChosen());
    setCurrentCategoryOptions(
      currentCategoryOptions.map((option: Option): Option => {
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
  };

  const handleNextButtonClick = () => {
    setIsNextButtonDisabled(true);
    dispatch(switchToNextLevel());
  };

  return (
    <>
      <div className={styles.AnswerOptions_Container}>
        <div className={styles.AnswerOptionsList_Container}>
          {currentCategoryOptions &&
            thisCategoryOptionsByLanguage.length > 0 &&
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
            <h4 className={styles.AnswerOptionDetails_Dummy_Text}>Послушайте плеер.</h4>
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
