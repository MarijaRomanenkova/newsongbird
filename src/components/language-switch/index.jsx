import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {switchToOtherLanguage};

import styles from 'index';

const LanguageSwitch = () => {
  const languageList = [{ code: 'en', name: 'English'},
  { code: 'ru', name: 'Russian'},
  { code: 'lt', name: 'Lithuanian'}];  
  const dispatch = useDispatch();

  let handleChange = (event) => {
    switchToOtherLanguage(event);  
  };

  return (
    <div className="Language-switch_Container">
      <label htmlFor='language'> Select Langauge : </label>
      <select id='language' onChange={handleChange} value={language}>
        {languageList.map((option) => {
          <option key={option} value={option.name}>{option.name}</option>;
        })}
      </select>
    </div>
  );
}

export default LanguageSwitch;
