import React from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

function Button({ isHidden, isDisabled, handleClick, name }) {
  const buttonClasses = cx({
    [styles.Hidden]: isHidden,
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
