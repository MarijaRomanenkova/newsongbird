/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { useSelector } from 'react-redux';

import { selectMessagesLanguage } from 'store/languageSlice';

const messagesLanguage = useSelector(selectMessagesLanguage);

let URL;
if (messagesLanguage === 'Russian') {
  URL = process.env.REACT_APP_RU;
} else if (messagesLanguage === 'Lithuanian') {
  URL = process.env.REACT_APP_LT;
} else {
  URL = process.env.REACT_APP_EN;
}

export const axiosInstance = axios.create({ baseURL: URL });
