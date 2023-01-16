import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  selectCurrentLevel,
  selectCategoriesNamesEN,
  selectCategoriesNamesRU,
  selectCategoriesNamesLT,
} from 'store/gameSlice';

import styles from 'components/categories/categories.module.scss';

function Categories() {
  const { i18n } = useTranslation();
  const currentLevel = useSelector(selectCurrentLevel);
  const categoriesNamesEN = useSelector(selectCategoriesNamesEN);
  const categoriesNamesRU = useSelector(selectCategoriesNamesRU);
  const categoriesNamesLT = useSelector(selectCategoriesNamesLT);
  console.log(i18n);

  return (
    <div className={styles.Categories__Container}>
      {categoriesNamesEN.map((category, index) => (
        <div
          key={category.uniqueID}
          className={
            index === currentLevel - 1
              ? styles.Category_Active
              : styles.Category
          }
        >
          <p className={styles.Categories_Text}>{category.name}</p>
        </div>
      ))}

      {categoriesNamesRU.map((category, index) => (
        <div
          key={category.uniqueID}
          className={
            index === currentLevel - 1
              ? styles.Category_Active
              : styles.Category
          }
        >
          <p className={styles.Categories_Text}>{category.name}</p>
        </div>
      ))}

      {categoriesNamesLT.map((category, index) => (
        <div
          key={category.uniqueID}
          className={
            index === currentLevel - 1
              ? styles.Category_Active
              : styles.Category
          }
        >
          <p className={styles.Categories_Text}>{category.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Categories;
