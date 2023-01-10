import React from 'react';
import { useDispatch } from 'react-redux';

import { switchToOtherLanguage } from 'store/gameSlice';
import flagLTsourceSVG from 'assets/flagLTsourceSVG.svg';
import flagRUsourceSVG from 'assets/flagRUsourceSVG.svg';
import flagGBsourceSVG from 'assets/flagGBsourceSVG.svg';

import styles from './index.module.scss';

function LanguageSwitch() {
  const languageList = [
    { code: 'en', name: 'English', img: flagGBsourceSVG },
    { code: 'ru', name: 'Russian', img: flagLTsourceSVG },
    { code: 'lt', name: 'Lithuanian', img: flagRUsourceSVG },
  ];
  const dispatch = useDispatch();

  const handleClick = (value) => {
    dispatch(switchToOtherLanguage(value));
  };

  return (
    <div className={styles.LanguageSwitch_Container}>
      {languageList.map((option) => (
        <button
          key={option.code}
          value={option.code}
          onClick={() => handleClick(option.value)}
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
