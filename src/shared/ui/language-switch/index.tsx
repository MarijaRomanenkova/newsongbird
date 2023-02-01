import React from 'react';
import { useTranslation } from 'react-i18next';

import { languageList } from 'shared/languageList';

import styles from './index.module.scss';

const LanguageSwitch = (): JSX.Element => {
  const { i18n } = useTranslation();

  return (
    <div className={styles.LanguageSwitch_Container}>
      {languageList.map(({ name, img, code }) => (
        <button
          key={code}
          value={code}
          onClick={() => i18n.changeLanguage(code)}
          type="button"
          className={styles.LanguageSwitch_Flag}
        >
          <img className={styles.LanguageSwitch_Img} src={img} alt={name} />
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitch;
