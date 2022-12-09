import React, { useContext } from 'react';

import { QuizContext } from 'contexts/quizContext';

import styles from 'components/categories/categories.module.scss';

function Categories() {
  const [QuizState] = useContext(QuizContext);
  const { level } = QuizState;
  // TODO: can we move these data to .json file and make it less static?
  const categoriesArray = [
    'Разминка',
    'Воробьиные',
    'Лесные птицы',
    'Певчие птицы',
    'Хищные птицы',
    'Mорские птицы',
  ];

  return (
    <div className={styles.Categories__Container}>
      {categoriesArray.map((category, index) => (
        <div
          key={index}
          className={index === level ? styles.Category_Active : styles.Category}
        >
          <p className={styles.Categories_Text}>{category}</p>
        </div>
      ))}
    </div>
  );
}
export default Categories;
