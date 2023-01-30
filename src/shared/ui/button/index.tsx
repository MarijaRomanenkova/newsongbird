import React, { MouseEventHandler } from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

interface ButtonProps {
  isDisabled: boolean;
  handleClick: MouseEventHandler;
  name: any;
  styles?: { [key: string]: string };
}

const Button = ({ isDisabled, handleClick, name, styles }: ButtonProps) => {
  const buttonClasses = classnames(styles, {
    [styles.Btn]: isDisabled,
    [styles.Btn_Active]: !isDisabled,
  });

  return (
    <button className={buttonClasses} type="button" onClick={handleClick}>
      {name}
    </button>
  );
};

export default Button;
