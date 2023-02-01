import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { selectCurrentLevel, selectBirdsData } from 'features/game/gameSlice';
import { useAppSelector } from 'app/hooks';

import styles from './index.module.scss';

const Categories: React.FC = () => {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const currentLevel = useAppSelector(selectCurrentLevel);
  const birdsData = useAppSelector(selectBirdsData);

  let categoryNames: string[] | [] = [];
  useEffect(() => {
    if (Object.keys(birdsData).length > 0)
      categoryNames = birdsData[language][0];
  }, [birdsData]);

  return (
    <div className={styles.Categories__Container}>
      {categoryNames.length > 0 &&
        categoryNames.map((category: string, index: number) => (
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
