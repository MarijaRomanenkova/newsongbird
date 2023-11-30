import React, { MouseEventHandler } from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

interface ButtonProps {
  isDisabled: boolean;
  handleClick: MouseEventHandler;
  text: string;
}

function Button({ isDisabled, handleClick, text }: ButtonProps): JSX.Element {
  const handleButtonClick: MouseEventHandler = (event) => {
    if (!isDisabled) {
      handleClick(event);
    }
  };

  const buttonClasses = cx({
    [styles.Btn]: isDisabled,
    [styles.Btn_Active]: !isDisabled,
  });

  return (
    <button className={buttonClasses} type="button" onClick={handleButtonClick}>
      {text}
    </button>
  );
}

export default Button;
