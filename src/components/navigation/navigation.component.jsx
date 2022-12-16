import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';

import styles from './navigation.module.scss';

function Navigation() {
  return (
    <>
      <nav className={styles.Navigation_Container}>
        <Link to="/">Home</Link>
        <NavLink className={styles.Navigation_Link} to="/login">
          Login
        </NavLink>
        <NavLink className={styles.Navigation_Link} to="/signup">SignUp</NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
