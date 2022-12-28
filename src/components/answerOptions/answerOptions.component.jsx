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
  selectCurrentCorrectAnswerObject,
  selectIsGameOver,
  choose,
  nextLevel,
  win,
  selectIsLoading,
} from 'store/gameSlice';

import styles from './answerOptions.module.scss';

function AnswerOptions() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);

  const currentLevelAnswersOptionsArray = useSelector(
    selectCurrentCategoryArray
  );

  const correctAnswer = useSelector(selectCurrentCorrectAnswerObject) || [];

  const isGameOver = useSelector(selectIsGameOver);

  const [playCorrectAnswerChosenSound] = useSound(correctAnswerChosenSoundOGG);
  const [playIncorrectAnswerChosenSound] = useSound(
    incorrectAnswerChosenSoundOGG
  );

  const [chosenAnswerOption, setChosenAnswerOption] = useState({
    isClicked: false,
  });

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  const [
    currentLevelAnswersOptionsArrayStatusAdded,
    setCurrentLevelAnswersOptionsArrayStatusAdded,
  ] = useState([currentLevelAnswersOptionsArray]);

  useEffect(() => {
    setCurrentLevelAnswersOptionsArrayStatusAdded(
      currentLevelAnswersOptionsArray.map((answerOption) => {
        if (answerOption.id === correctAnswer.id)
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
  }, [currentLevelAnswersOptionsArray]);

  function setChosenAnswer(id) {
    const currentObjectIndex = id - 1;
    const currentAnswerOptionObject =
      currentLevelAnswersOptionsArray[currentObjectIndex];

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
    dispatch(choose());
    setCurrentLevelAnswersOptionsArrayStatusAdded(
      currentLevelAnswersOptionsArrayStatusAdded.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isChosenAnswer: true,
          };
        }
        return { ...item };
      })
    );

    if (id === correctAnswer.id) {
      dispatch(win());
      playCorrectAnswerChosenSound();
      if (!isGameOver) {
        setIsNextButtonDisabled(false);
      }
    }
    playIncorrectAnswerChosenSound();
  }

  const handleNextButtonClick = () => {
    setIsNextButtonDisabled(true);
    dispatch(nextLevel());
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (!isLoading) {
    return (
      <>
        <div className={styles.AnswerOptions_Container}>
          <div className={styles.AnswerOptionsList_Container}>
            {currentLevelAnswersOptionsArrayStatusAdded.map((item) => (
              <button
                key={item.index + item.name}
                className={styles.AnswerOptionsList_Item}
                type="button"
                onClick={() => handleAnswerOptionClick(item.id)}
              >
                <Circle
                  isChosenAnswer={item.isChosenAnswer}
                  isCorrectAnswer={item.isCorrectAnswer}
                />
                {item.name}
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
}

export default AnswerOptions;
