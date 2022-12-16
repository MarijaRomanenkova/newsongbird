import React from 'react';
import { Link } from 'react-router-dom';

import styles from './login.module.scss';

function Login() {
  return (
    <div className={styles.Login_Container}>
      <Link to="/login/">SignUp</Link>
      <Link to="/signup/">SignUp</Link>
      <input placeholder="email" />
      <input placeholder="password" />
      <input placeholder="confirm password" />
    </div>
  );
}

export default Login;
