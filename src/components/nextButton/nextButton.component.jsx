import React from 'react';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

import styles from './nextButton.module.scss';

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
      <FormattedMessage id="next-level" defaultMessage=" Next Level" />
    </button>
  );
}

export default NextButton;
