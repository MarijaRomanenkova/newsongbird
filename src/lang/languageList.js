/* eslint-disable import/prefer-default-export */
import flagLTsourceSVG from 'assets/flagLTsourceSVG.svg';
import flagRUsourceSVG from 'assets/flagRUsourceSVG.svg';
import flagGBsourceSVG from 'assets/flagGBsourceSVG.svg';

export const languageList = [
  {
    locale: 'en-EN',
    name: 'English',
    img: flagGBsourceSVG,
    url: '/dataen.json',
  },
  {
    locale: 'ru-RU',
    name: 'Russian',
    img: flagRUsourceSVG,
    url: '/dataru.json',
  },
  {
    locale: 'lt-LT',
    name: 'Lithuanian',
    img: flagLTsourceSVG,
    url: '/datalt.json',
  },
];
