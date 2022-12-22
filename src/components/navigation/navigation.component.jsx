import React from 'react';
import { NavLink } from 'react-router-dom';

import logoSourceSVG from 'assets/logoSourceSVG.svg';
import Score from 'components/score/score.component';

import styles from './navigation.module.scss';

function Navigation() {
  return (
    <nav className={styles.Navigation_Container}>
      <NavLink to="/">
        <div>
          <img className={styles.Logo} src={logoSourceSVG} alt="Logo" />
        </div>
      </NavLink>
      <div className={styles.Navigation_Link_Wrapper}>
        <NavLink className={styles.Navigation_Link} to="/login">
          Login
        </NavLink>
        <NavLink className={styles.Navigation_Link} to="/signup">
          Sign Up
        </NavLink>
      </div>
      <Score />
    </nav>
  );
}

export default Navigation;
