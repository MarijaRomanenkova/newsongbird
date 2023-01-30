import React from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

interface Props {
  isTouched: boolean;
  isCorrectAnswer: boolean;
}

const Circle = ({ isTouched, isCorrectAnswer }: Props): JSX.Element => {
  const circleStyles = cx({
    [styles.Circle_Basic]: !isTouched,
    [styles.Circle_CorrectOption]: isTouched && isCorrectAnswer,
    [styles.Circle_IncorrectOption]: isTouched && !isCorrectAnswer,
  });
  return <span className={circleStyles} />;
};

export default Circle;
