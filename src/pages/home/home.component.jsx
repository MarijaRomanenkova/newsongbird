import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Game from 'components/game/index';
import Loader from 'components/loader/loader.component';
import { useIntl } from 'react-intl';

import { getBirdsData, selectIsRequestLoading } from 'store/gameSlice';

import styles from './home.module.scss';

function Home() {
  const isRequestLoading = useSelector(selectIsRequestLoading);
  const intl = useIntl();
  let url = '/dataen.json';
  if (intl.locale === 'ru-RU') {
    url = '/dataru.json';
  }
  if (intl.locale === 'lt-LT') {
    url = '/datalt.json';
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBirdsData(url));
  }, [intl.locale]);

  return (
    <div className={styles.Game_Container}>
      {isRequestLoading && <Loader />}
      <Game />
    </div>
  );
}

export default Home;
