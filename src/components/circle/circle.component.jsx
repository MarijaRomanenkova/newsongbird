import React from 'react';
import cx from 'classnames';

import styles from './circle.module.scss';

function Circle({ isTouched, isCorrectAnswer }) {
  const circleStyles = cx({
    [styles.Circle_Basic]: !isTouched,
    [styles.Circle_CorrectOption]: isTouched && isCorrectAnswer,
    [styles.Circle_IncorrectOption]: isTouched && !isCorrectAnswer,
  });
  return <span className={circleStyles} />;
}

export default Circle;
