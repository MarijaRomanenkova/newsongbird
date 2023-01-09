import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Confetti from 'react-confetti';

import Game from 'components/game/index';
import Loader from 'components/loader/loader.component';

import { getBirdsData, selectIsRequestLoading, selectIsGameOver } from 'store/gameSlice';

import styles from './home.module.scss';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

function Home() {
  const isRequestLoading = useSelector(selectIsRequestLoading);
  const isGameOver = useSelector(selectIsGameOver);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBirdsData());
  }, []);

  return (
    <div className={styles.Game_Container}>
      {isRequestLoading && <Loader />}
      {isGameOver && <Confetti width={windowWidth} height={windowHeight} />}
      <Game />
    </div>
  );
}

export default Home;
