import React, { useContext, useEffect, useState } from 'react';
import useSound from 'use-sound';
import cx from 'classnames';

import { QuizContext } from 'contexts/quizContext';
import correctAnswerChosenSoundOGG from 'assets/sounds/correctAnswerChosenSound.ogg';
import incorrectAnswerChosenSoundOGG from 'assets/sounds/incorrectAnswerChosenSound.ogg';
import AnswerOptionDetails from 'components/answerOptionDetails/answerOptionDetails.component';

import styles from './answerOptions.module.scss';

function AnswerOptions() {
  const [QuizState, dispatch] = useContext(QuizContext);
  const currentLevelAnswersOptionsArray =
    QuizState.birdsData[QuizState.currentLevel];

  const correctAnswer =
    currentLevelAnswersOptionsArray[QuizState.correctAnswerID];

  const { isGameOver } = QuizState;

  const [playCorrectAnswerChosenSound] = useSound(correctAnswerChosenSoundOGG);
  const [playIncorrectAnswerChosenSound] = useSound(
    incorrectAnswerChosenSoundOGG
  );

  const [chosenAnswerOption, setChosenAnswerOption] = useState({
    isClicked: false,
  });

  const [
    currentLevelAnswersOptionsArrayStatusAdded,
    setCurrentLevelAnswersOptionsArrayStatusAdded,
  ] = useState([]);

  console.log(
    'currentLevelAnswersOptionsArray',
    currentLevelAnswersOptionsArray
  );

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

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  useEffect(() => {
    setIsNextButtonDisabled(true);
  }, [isGameOver]);

  const nextButtonClasses = cx({
    [styles.Hidden]: isGameOver,
    [styles.Disabled]: isNextButtonDisabled,
    [styles.Btn]: !isNextButtonDisabled,
  });

  function chooseAnswerOption(id) {
    if (!isNextButtonDisabled) {
      return;
    }
    const currentIndex = id - 1;
    const currentAnswerOptionObject =
      currentLevelAnswersOptionsArray[currentIndex];

    setChosenAnswerOption({
      isClicked: true,
      id,
      name: currentAnswerOptionObject.name,
      species: currentAnswerOptionObject.species,
      image: currentAnswerOptionObject.image,
      audio: currentAnswerOptionObject.audio,
      description: currentAnswerOptionObject.description,
    });

    dispatch({ type: 'CHOOSE' });
    setCurrentLevelAnswersOptionsArrayStatusAdded(
      currentLevelAnswersOptionsArrayStatusAdded.map((item) => {
        if (item.id === id) {
          return { ...item, isChosenAnswer: true };
        }
        return { ...item };
      })
    );

    if (id === correctAnswer.id) {
      setIsNextButtonDisabled(false);
      dispatch({ type: 'WIN' });
      playCorrectAnswerChosenSound();
    }
    playIncorrectAnswerChosenSound();
  }

  function handleNextButtonClick() {
    setIsNextButtonDisabled(true);
    dispatch({ type: 'NEXT_LEVEL' });
    if (isGameOver) {
      dispatch({ type: 'NEW_GAME' });
    }
  }

  return (
    <>
      <div className={styles.AnswerOptions_Container}>
        <div className={styles.AnswerOptionsList_Container}>
          {currentLevelAnswersOptionsArrayStatusAdded.map((item) => (
            <button
              className={styles.AnswerOptionsList_Item}
              type="button"
              key={item.id}
              value={item.id}
              onClick={() => chooseAnswerOption(item.id)}
            >
              <span
                className={cx({
                  [styles.Circle]: !item.isChosenAnswer,
                  [styles.CorrectOptionChosen]:
                    item.isChosenAnswer && item.isCorrectAnswer,
                  [styles.IncorrectOptionChosen]:
                    item.isChosenAnswer && !item.isCorrectAnswer,
                })}
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
      <button
        type="button"
        disabled={isNextButtonDisabled}
        className={nextButtonClasses}
        onClick={handleNextButtonClick}
      >
        Next Level
      </button>
    </>
  );
}

export default AnswerOptions;
