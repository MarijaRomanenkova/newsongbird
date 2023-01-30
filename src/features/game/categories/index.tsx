import React, { ReactNode } from 'react';
import { useAppSelector } from 'app/hooks';
import { useTranslation } from 'react-i18next';

import { selectCurrentLevel, selectBirdsData } from 'features/game/gameSlice';
import { AnswerOptionsArray, Option } from 'shared/interfaces';

import styles from './index.module.scss';

const Categories: Function = (): ReactNode[] => {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const currentLevel = useAppSelector(selectCurrentLevel);
  const birdsData = useAppSelector(selectBirdsData);
  const categoryNames: AnswerOptionsArray = birdsData[language];
  return (
    <div className={styles.Categories__Container}>
      {categoryNames &&
        categoryNames[0].map((category: string, index: number) => (
          <div
            key={category}
            className={
              index === currentLevel - 1
                ? styles.Category_Active
                : styles.Category
            }
          >
            <p className={styles.Categories_Text}>{category}</p>
          </div>
        ))}
    </div>
  );
};

export default Categories;
