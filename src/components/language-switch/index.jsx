import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { languageList } from 'lang/languageList';
import { switchLanguage } from 'store/gameSlice';

import styles from './index.module.scss';

function LanguageSwitch() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(switchLanguage(lng));
  };
  return (
    <div className={styles.LanguageSwitch_Container}>
      {languageList.map(({ name, img, code }) => (
        <button
          key={code}
          value={code}
          onClick={() => changeLanguage(code)}
          type="button"
          className={styles.LanguageSwitch_Flag}
        >
          <img className={styles.LanguageSwitch_Img} src={img} alt={name} />
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitch;
