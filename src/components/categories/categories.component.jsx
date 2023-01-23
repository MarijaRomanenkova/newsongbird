import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { selectCurrentLevel, selectBirdsData } from 'store/gameSlice';

import styles from 'components/categories/categories.module.scss';

function Categories() {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const currentLevel = useSelector(selectCurrentLevel);
  const birdsData = useSelector(selectBirdsData);
  const categoryNames = birdsData[language];
  return (
    <div className={styles.Categories__Container}>
      {categoryNames &&
        categoryNames[0].map((category, index) => (
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
