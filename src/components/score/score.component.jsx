import React from 'react';
import { useSelector } from 'react-redux';

import { selectScore } from 'store/gameSlice';

import styles from './score.module.scss';

function Score() {
  
  const score  = useSelector(selectScore);

  return (
    <div className={styles.Score}>
      <p> Score: {score}</p>
    </div>
  );
}

export default Score;
