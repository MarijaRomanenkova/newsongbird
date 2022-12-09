import React, { useContext } from 'react';

import { QuizContext } from 'contexts/quizContext';
import logo from 'assets/logo.svg';

import styles from './header.module.scss';

function Header() {
  const [QuizState] = useContext(QuizContext);
  const { score } = QuizState.score;

  return (
    <div className={styles.Header_Container}>
      <div>
        <img className={styles.Logo} src={logo} alt="Logo" />
      </div>
      <div className={styles.Score}>
        <p> Score: {score}</p>
      </div>
    </div>
  );
}
export default Header;
