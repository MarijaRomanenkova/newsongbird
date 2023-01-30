import React from 'react';
import { useAppSelector } from 'app/hooks';
import { useTranslation } from 'react-i18next';

import { selectScore } from 'features/game/gameSlice';

import styles from './index.module.scss';

const Score = () => {
  const score = useAppSelector(selectScore);
  const { t } = useTranslation();

  return (
    <div className={styles.Score}>
      <p>
        {t('score')}
        {score}
      </p>
    </div>
  );
};

export default Score;
