import React from 'react';
import { useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';

import { selectCurrentLevel, selectCategoriesNames } from 'store/gameSlice';

import styles from 'components/categories/categories.module.scss';

function Categories() {
  // const { i18n } = useTranslation();
  // eslint-disable-next-line prefer-destructuring
  // const language = i18n.language;
  const currentLevel = useSelector(selectCurrentLevel);
  const categoriesNames = useSelector(selectCategoriesNames);
  const neededObject = categoriesNames[];
  console.log(categoriesNames);
  console.log(neededObject)
 

  return (
    <div className={styles.Categories__Container}>
      {categoriesNames.map((category, index) => (
        <div
          key={category}
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
