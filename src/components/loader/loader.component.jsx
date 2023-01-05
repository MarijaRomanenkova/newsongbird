import React from 'react';

import styles from './loader.module.scss';

function Loader() {
  return (
    <div className={styles.Loader_Box}>
      <div className={styles.Loader_Spinner} />
    </div>
  );
}

export default Loader;
