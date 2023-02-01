import React from 'react';

import styles from './index.module.scss';

const Loader = () => {
  return (
    <div className={styles.Loader_Container}>
      <div className={styles.Loader_Spinner} />
      <h1>Loading please wait ...</h1>
    </div>
  );
};

export default Loader;
