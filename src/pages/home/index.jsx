import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Game from 'features/game/index';
import Loader from 'shared/ui/loader';
import { getBirdsData, selectIsRequestLoading } from 'features/game/gameSlice';

import styles from './index.module.scss';

function Home() {
  const isRequestLoading = useSelector(selectIsRequestLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBirdsData());
  }, []);

  return (
    <div className={styles.Game_Container}>
      {isRequestLoading && <Loader />}
      <Game />
    </div>
  );
}

export default Home;
