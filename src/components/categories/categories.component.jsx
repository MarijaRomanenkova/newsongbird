/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import { QuizContext } from 'contexts/QuizContext';
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
  // TODO: not sure that this is better to write here, can we move it to JSX?
  const CategoriesList = categoriesArray.map((category, index) => (
    <div
    // TODO:  remove eslint-disable
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      className={index === level ? styles.Category_Active : styles.Category}
    >
      {/* TODO: do we really need ' ' in line below? */}
      <p className={styles.Categories_Text}>{category}</p>{' '}
    </div>
  ));

  return <div className={styles.Categories__Container}>{CategoriesList}</div>;
}
export default Categories;
