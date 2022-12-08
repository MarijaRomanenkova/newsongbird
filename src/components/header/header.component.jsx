/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import { QuizContext } from 'contexts/QuizContext';
import styles from 'components/header/header.module.scss';
// TODO: need to use absolute path
import logo from '../../assets/logo.svg';

function Header() {
  const [QuizState] = useContext(QuizContext);
  const { score } = QuizState.score;

  return (
    <div className={styles.Header_Container}>
      <div>
        <img className={styles.Logo} src={logo} alt="Logo" />
      </div>
      <div className={styles.Score}>
        <p> Score: {score}</p>{' '}
      </div>
    </div>
  );
}
export default Header;
