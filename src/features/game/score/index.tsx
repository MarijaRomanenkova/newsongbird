import React from 'react';
import { useTranslation } from 'react-i18next';

import { selectScore } from 'features/game/gameSlice';
import { useAppSelector } from 'app/hooks';

import styles from './index.module.scss';

const Score = (): JSX.Element => {
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
