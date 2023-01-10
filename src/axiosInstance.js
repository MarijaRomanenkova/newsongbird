/* eslint-disable import/prefer-default-export */
import React from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';

import { selectMessagesLanguage } from 'store/languageSlice';

const AxiosInstance = () => {
  const messagesLanguage = useSelector(selectMessagesLanguage);

  let URL;
  if (messagesLanguage === 'Russian') {
    URL = process.env.REACT_APP_RU;
  } else if (messagesLanguage === 'Lithuanian') {
    URL = process.env.REACT_APP_LT;
  } else {
    URL = process.env.REACT_APP_EN;
  }

  React.useEffect(() => {
    axios.create({ baseURL: URL });
  }, [messagesLanguage]);
};

export default AxiosInstance;
