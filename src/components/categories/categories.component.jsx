import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentLevel, selectCategoriesNames } from 'store/gameSlice';

import styles from 'components/categories/categories.module.scss';

function Categories() {
  const currentLevel = useSelector(selectCurrentLevel);
  const categoriesNames = useSelector(selectCategoriesNames);

  return (
    <div className={styles.Categories__Container}>
      {categoriesNames.map((category, index) => (
        <div
          key={category.uniqueID}
          className={
            index === currentLevel - 3
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
