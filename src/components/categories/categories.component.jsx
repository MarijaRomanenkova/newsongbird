import React from 'react';
import { useSelector } from 'react-redux';

import {
  selectCurrentLevel,
  selectCategoriesNames,
  selectIsLoading,
} from 'store/gameSlice';

import styles from 'components/categories/categories.module.scss';

function Categories() {
  const isLoading = useSelector(selectIsLoading);
  const currentLevel = useSelector(selectCurrentLevel);
  const categoriesArray = useSelector(selectCategoriesNames);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (!isLoading) {
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
            <p className={styles.Categories_Text}>{category}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Categories;
