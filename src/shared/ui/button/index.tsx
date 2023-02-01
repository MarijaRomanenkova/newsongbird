import React, { MouseEventHandler } from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

interface ButtonProps {
  isDisabled: boolean;
  handleClick: MouseEventHandler;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any;
}

function Button({ isDisabled, handleClick, text }: ButtonProps): JSX.Element {
  const buttonClasses = cx({
    [styles.Btn]: isDisabled,
    [styles.Btn_Active]: !isDisabled,
  });

  return (
    <button className={buttonClasses} type="button" onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;
