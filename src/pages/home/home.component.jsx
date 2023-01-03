import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Game from 'components/game/index';
import Loader from 'components/loader/loader.component';
import { getBirdsData, selectCorrectAnswerID } from 'store/gameSlice';

import styles from './home.module.scss';

function Home() {
  const correctAnswerID = useSelector(selectCorrectAnswerID);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBirdsData());
  }, []);

  return (
    <div className={styles.Game_Container}>
      {correctAnswerID === 0 && <Loader />}
      {correctAnswerID > 0 && <Game />}
    </div>
  );
}

export default Home;
