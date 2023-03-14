import React from 'react';
import { useTranslation } from 'react-i18next';

import { selectBirdsData, selectCurrentLevel } from 'features/game/gameSlice';
import { useAppSelector } from 'app/hooks';
import { LEVEL_STORING_CATEGORIES_NAMES } from 'features/game/gameSettings';

import styles from './index.module.scss';

function Categories() {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const birdsData = useAppSelector(selectBirdsData);
  const currentLevel = useAppSelector(selectCurrentLevel);

  let categoryNames: string[] | [] = [];
  console.log(categoryNames);

  if (Object.keys(birdsData).length > 0 && LEVEL_STORING_CATEGORIES_NAMES) {
    categoryNames = birdsData[language][LEVEL_STORING_CATEGORIES_NAMES];
  }

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
}

export default Categories;
