import React from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './nextButton.module.scss';

function NextButton({
  isGameOver,
  isNextButtonDisabled,
  handleNextButtonClick,
}) {
  const { t } = useTranslation();
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
      {t('next-level')}
    </button>
  );
}

export default NextButton;
