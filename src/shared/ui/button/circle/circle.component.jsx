import React from 'react';
import cx from 'classnames';

import styles from './circle.module.scss';

function Circle({ isChosenAnswer, isCorrectAnswer }) {
  const circleStyles = cx({
    [styles.Circle_Basic]: !isChosenAnswer,
    [styles.Circle_CorrectOption]: isChosenAnswer && isCorrectAnswer,
    [styles.Circle_IncorrectOption]: isChosenAnswer && !isCorrectAnswer,
  });
  return <span className={circleStyles} />;
}

export default Circle;
