import React from 'react';
import { useTranslation } from 'react-i18next';

import { languageList } from 'lang/languageList';

import styles from './index.module.scss';

function LanguageSwitch() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  console.log('i18n', i18n);
  

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
