/* eslint-disable no-inner-declarations */
import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { useSelector, useDispatch } from 'react-redux';

import correctAnswerChosenSoundOGG from 'assets/sounds/correctAnswerChosenSound.ogg';
import incorrectAnswerChosenSoundOGG from 'assets/sounds/incorrectAnswerChosenSound.ogg';
import AnswerOptionDetails from 'components/answerOptionDetails/answerOptionDetails.component';
import Circle from 'components/circle/circle.component';
import NextButton from 'components/nextButton/nextButton.component';
import {
  selectCurrentCategoryArray,
  selectCorrectAnswerObject,
  selectIsGameOver,
  switchToNextLevel,
  correctAnswerChosen,
  answerWasChosen,
} from 'store/gameSlice';

import styles from './answerOptions.module.scss';

function AnswerOptions() {
  const dispatch = useDispatch();

  const currentCategoryArray = useSelector(selectCurrentCategoryArray);

  const correctAnswerObject = useSelector(selectCorrectAnswerObject) || [];

  const isGameOver = useSelector(selectIsGameOver);

  const [playCorrectAnswerChosenSound] = useSound(correctAnswerChosenSoundOGG);
  const [playIncorrectAnswerChosenSound] = useSound(
    incorrectAnswerChosenSoundOGG
  );

  const [chosenAnswerOption, setChosenAnswerOption] = useState({
    isClicked: false,
  });

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  const [currentCategoryArrayWithStatus, setcurrentCategoryArrayWithStatus] =
    useState([currentCategoryArray]);

  useEffect(() => {
    setcurrentCategoryArrayWithStatus(
      currentCategoryArray.map((answerOption) => {
        if (answerOption.id === correctAnswerObject.id)
          return {
            ...answerOption,
            isChosenAnswer: false,
            isCorrectAnswer: true,
          };
        return {
          ...answerOption,
          isChosenAnswer: false,
          isCorrectAnswer: false,
        };
      })
    );
  }, [currentCategoryArray]);

  function setChosenAnswer(id) {
    const currentObjectIndex = id - 1;
    const currentAnswerOptionObject = currentCategoryArray[currentObjectIndex];

    setChosenAnswerOption({
      isClicked: true,
      id,
      name: currentAnswerOptionObject.name,
      species: currentAnswerOptionObject.species,
      image: currentAnswerOptionObject.image,
      audio: currentAnswerOptionObject.audio,
      description: currentAnswerOptionObject.description,
    });
  }

  function handleAnswerOptionClick(id) {
    if (!isNextButtonDisabled) {
      return;
    }
    setChosenAnswer(id);
    dispatch(answerWasChosen());
    setcurrentCategoryArrayWithStatus(
      currentCategoryArrayWithStatus.map((option) => {
        if (option.id === id) {
          return {
            ...option,
            isChosenAnswer: true,
          };
        }
        return { ...option };
      })
    );

    if (id === correctAnswerObject.id) {
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
          {currentCategoryArrayWithStatus.map((option) => (
            <button
              key={option.id + option.name}
              className={styles.AnswerOptionsList_Option}
              type="button"
              onClick={() => handleAnswerOptionClick(option.id)}
            >
              <Circle
                isChosenAnswer={option.isChosenAnswer}
                isCorrectAnswer={option.isCorrectAnswer}
              />
              {option.name}
            </button>
          ))}
        </div>

        {chosenAnswerOption.isClicked && (
          <AnswerOptionDetails
            name={chosenAnswerOption.name}
            image={chosenAnswerOption.image}
            description={chosenAnswerOption.description}
            audio={chosenAnswerOption.audio}
            species={chosenAnswerOption.species}
          />
        )}
        {!chosenAnswerOption.isClicked && (
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
