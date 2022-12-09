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
  const currentLevelAnswersOptionsArray = QuizState.birdsData[QuizState.level];
  const nextLevelAnswersOptionsArray = QuizState.birdsData[QuizState.level + 1];

  const correctAnswer =
    currentLevelAnswersOptionsArray[QuizState.correctAnswerID];
  const chosenAnswer = currentLevelAnswersOptionsArray[
    QuizState.chosenAnswerOptionId
    // TODO: looked tricky, try to redo
  ] || { id: undefined };

  // TODO: rename this variable to more specific one
  const { level } = QuizState;

  const { isGameOver } = QuizState;

  const [playCorrectAnswerChosenSound] = useSound(correctAnswerChosenSoundOGG);
  const [playIncorrectAnswerChosenSound] = useSound(
    incorrectAnswerChosenSoundOGG
  );
  // TODO: redo this logic with styles. need to discuss. looked tricky
  const initialAnswersListStyles = currentLevelAnswersOptionsArray.map(
    (item) => ({
      ...item,
      itemClass: styles.AnswersList_Item,
      isAlreadyChosen: false,
    })
  );

  const [answersListStyles, setAnswersListStyles] = useState(
    initialAnswersListStyles
  );
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  useEffect(() => {
    setIsNextButtonDisabled(true);
  }, [isGameOver]);

  useEffect(() => {
    setAnswersListStyles(initialAnswersListStyles);
  }, [level, isGameOver]);

  // TODO: 1. let use this cx inside JSX 2. remove "button", use only styles from classes, 3. if something true move it from object
  const nextButtonClasses = cx({
    button: true,
    [styles.Hidden]: isGameOver,
    [styles.Disabled]: isNextButtonDisabled,
    [styles.Btn]: !isNextButtonDisabled,
  });

  // TODO: logic looks tricky a little bit
  const changeAnswersListStyles = (id, newClassName) => {
    setAnswersListStyles((listStyles) =>
      listStyles.map((item) => {
        if (item.id === id) {
          return { ...item, itemClass: newClassName, isAlreadyChosen: true };
        }
        return { ...item };
      })
    );
  };

  // TODO: naming for this func looked incorrect
  function chooseAnswer(event) {
    // TODO: simplify condition
    if (isNextButtonDisabled === false) {
      return false;
    }
    dispatch({ type: 'CHOOSE', payload: event.target.value - 1 });
    if (correctAnswer.id === event.target.value) {
      dispatch({ type: 'WIN', payload: event.target.value - 1 });
      playCorrectAnswerChosenSound();
      // TODO: not sure about store styles in state. it looks like we need store only variable/s and using this/these variable/s add appropriate classnames
      changeAnswersListStyles(
        event.target.value,
        styles.AnswersList_Item__correct
      );
      setIsNextButtonDisabled(false);
      return true;
    }
    playIncorrectAnswerChosenSound();
    changeAnswersListStyles(
      event.target.value,
      styles.AnswersList_Item__incorrect
    );
    return true;
  }

  function handleNextButtonClick() {
    setIsNextButtonDisabled(true);
    dispatch({ type: 'NEXT_LEVEL' });
    if (isGameOver === true) {
      setAnswersListStyles(
        currentLevelAnswersOptionsArray.map((item) => ({
          ...item,
          itemClass: styles.AnswersList_Item,
          isAlreadyChosen: false,
        }))
      );
      dispatch({ type: 'NEW_GAME' });
    }
    setAnswersListStyles(
      nextLevelAnswersOptionsArray.map((item) => ({
        ...item,
        itemClass: styles.AnswersList_Item,
        isAlreadyChosen: false,
      }))
    );
  }

  const answersList = answersListStyles.map((item) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={item.itemClass}
      key={item.id}
      value={item.id}
      // TODO: remove : null
      onClick={!item.isAlreadyChosen ? chooseAnswer : null}
    >
      {/* TODO: do we really need ' ' in the bottom line? */} {item.name}
    </div>
  ));

  return (
    <div>
      <div className={styles.AnswerOptions_Container}>
        <ul className={styles.AnswerOptionsList_Container}>{answersList}</ul>
        {/* looks tricky with undefined */}
        {chosenAnswer.id !== undefined ? (
          <AnswerOptionDetails
            name={chosenAnswer.name}
            image={chosenAnswer.image}
            description={chosenAnswer.description}
            audio={chosenAnswer.audio}
            species={chosenAnswer.species}
          />
        ) : (
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
    </div>
  );
}

export default AnswerOptions;
