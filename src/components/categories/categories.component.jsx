import React from 'react';
import { useSelector } from 'react-redux';

import {
  selectCurrentLevel,
  selectCurrentCategoryArray,
} from 'store/gameSlice';

import styles from 'components/categories/categories.module.scss';

function Categories() {
  const currentLevel = useSelector(selectCurrentLevel);
  const categoriesArray = useSelector(selectCurrentCategoryArray);

  return (
    <div className={styles.Categories__Container}>
      {categoriesArray.map((category, index) => (
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
