import React, { MouseEventHandler } from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

interface ButtonProps {
  isDisabled: boolean;
  handleClick: MouseEventHandler;
  name: any;
}

const Button = ({
  isDisabled,
  handleClick,
  name,
}: ButtonProps): JSX.Element => {
  const buttonClasses = cx({
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
