import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Game from 'components/game/index';
import Loader from 'components/loader/loader.component';
import { getBirdsData, selectIsRequestLoading } from 'store/gameSlice';

import styles from './home.module.scss';

function Home() {
  const isRequestLoading = useSelector(selectIsRequestLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBirdsData());
  }, []);

  return (
    <div className={styles.Game_Container}>
      {isRequestLoading ? <Loader /> : <Game />}
    </div>
  );
}

export default Home;
