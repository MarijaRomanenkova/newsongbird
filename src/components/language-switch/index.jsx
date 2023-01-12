import React from 'react';

import { languageList } from 'lang/languageList';

import styles from './index.module.scss';

function LanguageSwitch({ handleClick }) {
  return (
    <div className={styles.LanguageSwitch_Container}>
      {languageList.map(({ name, img, code }) => (
        <button
          key={code}
          value={code}
          onClick={() => handleClick(code)}
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
