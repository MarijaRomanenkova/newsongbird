/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import { QuestionContext } from 'contexts/questionContext';
import styles from 'components/header/header.module.scss';
import logo from '../../assets/logo.svg';

function Header() {
  const [questionState] = useContext(QuestionContext);
  const { score } = questionState.score;

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
