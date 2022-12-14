import React, { useContext } from 'react';
import uuid from 'react-uuid';

import { QuizContext } from 'contexts/quizContext';

import styles from 'components/categories/categories.module.scss';

function Categories() {
  const [QuizState] = useContext(QuizContext);
  const { currentLevel } = QuizState;
  const categoriesNamesArray = QuizState.birdsData[0];

  return (
    <div className={styles.Categories__Container}>
      {categoriesNamesArray.map((category, index) => (
        <div
          key={uuid()}
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
