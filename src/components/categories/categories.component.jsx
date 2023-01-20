/* eslint-disable prefer-destructuring */
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { selectCurrentLevel, selectCategoriesNames } from 'store/gameSlice';

import styles from 'components/categories/categories.module.scss';

function Categories() {
  const { i18n } = useTranslation();
  const language = i18n.language;
  console.log(language);
  
  const currentLevel = useSelector(selectCurrentLevel);
  const [categoriesNames] = useSelector(selectCategoriesNames) || [];
  const currentLanguageCategoriesNames = categoriesNames|| []; 
  console.log(currentLanguageCategoriesNames);


  return (
    <div className={styles.Categories__Container}>
      {categoriesNames &&
        categoriesNames.ru.map((category, index) => (
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
