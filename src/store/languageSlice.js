import { createSlice } from '@reduxjs/toolkit';

const locale = navigator.language;
let lang;
if (locale === 'ru-RU') {
  lang = 'Russian';
} else if (locale === 'lt-LT') {
  lang = 'Lithuanian';
} else {
  lang = 'English';
}

const initialState = {
  locale,
  messagesLanguage: lang,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    switchToOtherLanguage: (state, action) => {
      if (action.payload === 'LT') {
        state.language = 'Lithuanian';
        state.locale = 'lt-LT';
      } else if (action.payload === 'RU') {
        state.language = 'Russian';
        state.locale = 'ru-RU';
      } else {
        state.language = 'English';
        state.locale = 'en_US';
      }
    },
  },
});

export const { switchToOtherLanguage } = languageSlice.actions;

export const selectMessagesLanguage = (state) =>
  state.language.messagesLanguage;
export const selectLocale = (state) => state.language.locale;

export default languageSlice.reducer;
