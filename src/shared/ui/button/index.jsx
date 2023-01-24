import React from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

function Button({ bolean, isDisabled, handleClick, name }) {

  const buttonClasses = cx({
    [styles.Hidden]: bolean,
    [styles.Disabled]: isDisabled,
    [styles.Btn]: !isDisabled,
  });

  return (
    <button className={buttonClasses} type="button" onClick={handleClick}>
      {name}
    </button>
  );
}

export default Button;
