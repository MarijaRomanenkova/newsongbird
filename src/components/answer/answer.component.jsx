import React, { useContext, useEffect, useState } from 'react';
import useSound from 'use-sound';
import cx from 'classnames';
// TODO: rename variables for sounds
import { QuizContext } from 'contexts/quizContext';
import correct from 'assets/sounds/correct.ogg';
import incorrect from 'assets/sounds/incorrect.ogg';
import AnswerDetails from 'components/answerDetails/answerDetails.component';

import styles from './answer.module.scssanswer.module.scss';

const Answer = () => {
  const [QuizState, dispatch] = useContext(QuizContext);
  // TODO: can we rename it? to something like currentQuestionsForLevelArray or something like this. rename this -> to current. it more meaningful.
  // TODO: or looks like we have thisLevelQuestionsArray and currentQuestionObject, it is tricky to understand why we need each of them
  const thisLevelQuestionsArray = QuizState.birdsData[QuizState.level];
  const nextLevelQuestionsArray =
    QuizState.birdsData[QuizState.level + 1];
  const currentQuestionObject =
    thisLevelQuestionsArray[QuizState.randomQuestionID] || {};
  const chosenAnswer = thisLevelQuestionsArray[
    QuizState.chosenAnswerId
    // TODO: looked tricky, try to redo
  ] || { id: undefined };
  // eslint-disable-next-line prefer-destructuring
  // TODO: rename this variable to more specific one
  const level = QuizState.level;
  // eslint-disable-next-line prefer-destructuring
  const isGameOver = QuizState.isGameOver;
  // TODO: try to not change variables. if you name some variable -> try to name it everewhere in this pattern
  const [playCorrect] = useSound(correct);
  const [playIncorrect] = useSound(incorrect);
  // TODO: redo this logic with styles. need to discuss. looked tricky
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
    if (currentQuestionObject.id === event.target.value) {
      dispatch({ type: 'WIN', payload: event.target.value - 1 });
      // TODO: because naming for sound is not specific, not obvious about what playCorrect will do. in example if this variable had naming playCorrectSound or playCorrectMusic or soundPlayCorrect or something else, it would be clearer
      playCorrect();
      // TODO: not sure about store styles in state. it looks like we need store only variable/s and using this/these variable/s add appropriate classnames
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
      // TODO: remove : null 
      onClick={!item.isAlreadyChosen ? chooseAnswer : null}
    >
      {/* TODO: do we really need ' ' in the bottom line? */}
      {' '}
      {item.name}
    </li>
  ));

  return (
    <div className={isGameOver ? styles.Hidden : ''}>
      {/* TODO: not sure about logic. can we show or hide gameover using condition in JSX instead of turn on/off classes */}
      <div className={styles.Answers_Container}>
        <ul className={styles.AnswersList_Container}>{answersList}</ul>
        {/* looks tricky with undefined */}
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
