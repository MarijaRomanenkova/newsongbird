import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { languageList } from 'shared/languageList';
import { switchLanguage, resetTheGame } from 'features/game/gameSlice';

import styles from './index.module.scss';

function LanguageSwitch() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  function handleSwitch(code: string) {
    i18n.changeLanguage(code);
    dispatch(switchLanguage(code));
    dispatch(resetTheGame());
  }

  return (
    <div className={styles.LanguageSwitch_Container}>
      {languageList.map(({ name, img, code }) => (
        <button
          key={code}
          value={code}
          onClick={() => handleSwitch(code)}
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
