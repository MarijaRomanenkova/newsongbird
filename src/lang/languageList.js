/* eslint-disable import/prefer-default-export */
import flagLTsourceSVG from 'assets/flagLTsourceSVG.svg';
import flagRUsourceSVG from 'assets/flagRUsourceSVG.svg';
import flagGBsourceSVG from 'assets/flagGBsourceSVG.svg';
import { LOCALES } from './locales';

export const languageList = [
  {
    locale: 'en-EN',
    name: 'English',
    code: LOCALES.ENGLISH,
    img: flagGBsourceSVG,
    url: '/dataen.json',
  },
  {
    locale: 'ru-RU',
    name: 'Russian',
    code: LOCALES.RUSSIAN,
    img: flagRUsourceSVG,
    url: '/dataru.json',
  },
  {
    locale: 'lt-LT',
    name: 'Lithuanian',
    code: LOCALES.LITHUANIAN,
    img: flagLTsourceSVG,
    url: '/datalt.json',
  },
];
