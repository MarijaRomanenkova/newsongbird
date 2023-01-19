import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentLevel, selectCategoriesNames } from 'store/gameSlice';

import styles from 'components/categories/categories.module.scss';

function Categories() {
  const currentLevel = useSelector(selectCurrentLevel);
  const categoriesNames = useSelector(selectCategoriesNames);
  console.log(categoriesNames[0])

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
          <p className={styles.Categories_Text}>{category}</p>
        </div>
      ))}
    </div>
  );
}

export default Categories;
