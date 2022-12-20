import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';

import logo from 'assets/logo.svg';
import Score from 'components/score/score.component';

import styles from './navigation.module.scss';


function Navigation() {
  return (
    <>
      <nav className={styles.Navigation_Container}>
        <Link to="/">
          <div>
            <img className={styles.Logo} src={logo} alt="Logo" />
          </div>
        </Link>
        <Score />
        <div>
        <NavLink className={styles.Navigation_Link} to="/login">
          Login
        </NavLink>
        <NavLink className={styles.Navigation_Link} to="/signup">
          SignUp
        </NavLink>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
