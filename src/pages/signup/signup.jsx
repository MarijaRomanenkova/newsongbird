import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <>
      <h1>Sign Up</h1>
      <Link to="/login/">Login</Link>
    </>
  );
}

export default SignUp;