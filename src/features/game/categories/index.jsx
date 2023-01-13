import React from 'react';
import { useSelector } from 'react-redux';

import {
  selectCurrentLevel,
  selectCategoriesNames,
} from 'features/game/gameSlice';

import styles from './index.module.scss';

function Categories() {
  const currentLevel = useSelector(selectCurrentLevel);
  const categoriesNames = useSelector(selectCategoriesNames);

  return (
    <div className={styles.Categories__Container}>
      {categoriesNames.map((category, index) => (
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
