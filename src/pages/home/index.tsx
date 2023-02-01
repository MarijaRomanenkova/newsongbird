import React, { useEffect } from 'react';

import Game from 'features/game/index';
import Loader from 'shared/ui/loader';
import { getBirdsData, selectIsRequestLoading } from 'features/game/gameSlice';
import { useAppSelector, useAppDispatch } from 'app/hooks';

import styles from './index.module.scss';

const Home: React.FC = () => {
  const isRequestLoading = useAppSelector(selectIsRequestLoading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBirdsData());
  }, []);

  return (
    <div className={styles.Game_Container}>
      {isRequestLoading && <Loader />}
      <Game />
    </div>
  );
};

export default Home;
