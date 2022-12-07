/* eslint-disable import/no-unresolved */
/* eslint-disable react/function-component-definition */
import React, { useContext, useEffect, useState } from 'react';
import { QuestionContext } from 'contexts/questionContext';
import useSound from 'use-sound';
import cx from 'classnames';
import correct from 'assets/sounds/correct.ogg';
import incorrect from 'assets/sounds/incorrect.ogg';
import AnswerDetails from 'components/answerDetails/answerDetails.component';
import styles from 'components/answer/answer.module.scss';

const Answer = () => {
  const [questionState, dispatch] = useContext(QuestionContext);
  const thisLevelQuestionsArray = questionState.birdsData[questionState.level];
  const nextLevelQuestionsArray =
    questionState.birdsData[questionState.level + 1];
  const currentQuestionObject =
    thisLevelQuestionsArray[questionState.randomQuestionID] || {};
  const chosenAnswer = thisLevelQuestionsArray[
    questionState.chosenAnswerId
  ] || { id: undefined };
  // eslint-disable-next-line prefer-destructuring
  const level = questionState.level;
  // eslint-disable-next-line prefer-destructuring
  const isGameOver = questionState.isGameOver;
  const [playCorrect] = useSound(correct);
  const [playIncorrect] = useSound(incorrect);
  const initialAnswersListStyles = thisLevelQuestionsArray.map((item) => ({
    ...item,
    itemClass: styles.AnswersList_Item,
    isAlreadyChosen: false,
  }));

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

  const nextButtonClasses = cx({
    button: true,
    [styles.Hidden]: isGameOver,
    [styles.Disabled]: isNextButtonDisabled,
    [styles.Btn]: !isNextButtonDisabled,
  });

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

  function chooseAnswer(event) {
    if (isNextButtonDisabled === false) {
      return false;
    }
    dispatch({ type: 'CHOOSE', payload: event.target.value - 1 });
    if (currentQuestionObject.id === event.target.value) {
      dispatch({ type: 'WIN', payload: event.target.value - 1 });
      playCorrect();
      changeAnswersListStyles(
        event.target.value,
        styles.AnswersList_Item__correct
      );
      setIsNextButtonDisabled(false);
      return true;
    }
    playIncorrect();
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
        thisLevelQuestionsArray.map((item) => ({
          ...item,
          itemClass: styles.AnswersList_Item,
          isAlreadyChosen: false,
        }))
      );
      dispatch({ type: 'NEW_GAME' });
    }
    setAnswersListStyles(
      nextLevelQuestionsArray.map((item) => ({
        ...item,
        itemClass: styles.AnswersList_Item,
        isAlreadyChosen: false,
      }))
    );
  }

  const answersList = answersListStyles.map((item) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li
      className={item.itemClass}
      key={item.id}
      value={item.id}
      onClick={!item.isAlreadyChosen ? chooseAnswer : null}
    >
      {' '}
      {item.name}
    </li>
  ));

  return (
    <div className={isGameOver ? styles.Hidden : ''}>
      <div className={styles.Answers_Container}>
        <ul className={styles.AnswersList_Container}>{answersList}</ul>
        {chosenAnswer.id !== undefined ? (
          <AnswerDetails
            name={chosenAnswer.name}
            image={chosenAnswer.image}
            description={chosenAnswer.description}
            audio={chosenAnswer.audio}
            species={chosenAnswer.species}
          />
        ) : (
          <div className={styles.AnswerDetails_Dummy}>
            <h4 className={styles.AnswerDetails_Dummy_Text}>
              Послушайте плеер.
            </h4>
            <h4 className={styles.AnswerDetails_Dummy_Text}>
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
};

export default Answer;
