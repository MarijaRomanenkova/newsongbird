import React, { useEffect } from 'react';

import Game from 'features/game/index';
import Loader from 'shared/ui/loader';
import { getBirdsData, selectIsRequestLoading } from 'features/game/gameSlice';
import { useAppSelector, useAppDispatch } from 'app/hooks';

import styles from './index.module.scss';

function Home() {
  const isRequestLoading = useAppSelector(selectIsRequestLoading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBirdsData());
    console.log('we are moving');
  }, []);

  return (
    <div className={styles.Game_Container}>
      {isRequestLoading && <Loader />}
      <Game />
    </div>
  );
}

export default Home;
