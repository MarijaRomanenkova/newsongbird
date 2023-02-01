import flagLTsourceSVG from 'shared/assets/flagLTsourceSVG.svg';
import flagRUsourceSVG from 'shared/assets/flagRUsourceSVG.svg';
import flagGBsourceSVG from 'shared/assets/flagGBsourceSVG.svg';

interface LanguageItem {
  name: string;
  code: string;
  img: any;
}

export const languageList: LanguageItem[] = [
  {
    name: 'English',
    code: 'en',
    img: flagGBsourceSVG,
  },
  {
    name: 'ru',
    code: 'ru',
    img: flagRUsourceSVG,
  },
  {
    name: 'Lithuanian',
    code: 'lt',
    img: flagLTsourceSVG,
  },
];
