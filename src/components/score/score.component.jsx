import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { selectScore } from 'store/gameSlice';

import styles from './score.module.scss';

function Score() {
  const score = useSelector(selectScore);
  const { t } = useTranslation();

  return (
    <div className={styles.Score}>
      <p>
        {t('score')}
        {score}
      </p>
    </div>
  );
}

export default Score;
