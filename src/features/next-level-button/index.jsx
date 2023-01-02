import React from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

function NextButton({
  isGameOver,
  isNextButtonDisabled,
  handleNextButtonClick,
}) {
  const nextButtonClasses = cx({
    [styles.Hidden]: isGameOver,
    [styles.Disabled]: isNextButtonDisabled,
    [styles.Btn]: !isNextButtonDisabled,
  });

  return (
    <button
      className={nextButtonClasses}
      type="button"
      onClick={handleNextButtonClick}
      disabled={isNextButtonDisabled}
    >
      Next Level
    </button>
  );
}

export default NextButton;
