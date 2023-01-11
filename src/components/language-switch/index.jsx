import React from 'react';
import { useDispatch } from 'react-redux';

import { switchToOtherLanguage } from 'store/gameSlice';

import { languageList } from 'lang/languageList';

import styles from './index.module.scss';

function LanguageSwitch() {
  const dispatch = useDispatch();

  const handleClick = (locale) => {
    dispatch(switchToOtherLanguage(locale));
  };

  return (
    <div className={styles.LanguageSwitch_Container}>
      {languageList.map((option) => (
        <button
          key={option.locale}
          value={option.locale}
          onClick={() => handleClick(option.locale)}
          type="button"
          className={styles.LanguageSwitch_Flag}
        >
          <img
            className={styles.LanguageSwitch_Img}
            src={option.img}
            alt={option.name}
          />
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitch;
