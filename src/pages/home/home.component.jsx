import React, { useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';

import Loader from 'components/loader/loader.component';
import { getBirdsData } from 'store/gameSlice';

import styles from './home.module.scss';

const Game = React.lazy(() => import('components/game/index'));

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBirdsData());
  }, []);

  return (
    <div className={styles.Game_Container}>
      <Suspense fallback={<Loader />}>
        <Game />
      </Suspense>
    </div>
  );
}

export default Home;
