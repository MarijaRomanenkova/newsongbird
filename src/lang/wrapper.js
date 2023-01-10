import React, { useState, CreateContext} from 'react';

export const Context = CreateContext();



function Wrapper(props) {
  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(lang);

  function selectLanguage(e) {
    const newLocale = e.target.value;
    setLocale(newLocale);
    if (newLocale === 'lt-LT') {
      setMessages(Lithuanian);
    } else if (newLocale === 'ru-RU') {
      setMessages(Russian);
    } else {
      setMessages(English);
    }
  }
  return (
    <ContextProvider value={{ locale, selectLanguage }}>
      <IntlProvider messages={messages} locale={locale}>
        {props.children}
      </IntlProvider>
    </ContextProvider>
  );
}
export default Wrapper;
