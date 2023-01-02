import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Game from 'components/game/index';
import Loader from 'components/loader/loader.component';
import {
  selectIsQuestionaryDataLoading,
  getFirstQuizAnswear,
} from 'store/gameSlice';

import styles from './home.module.scss';

function Home() {
  const isQuestionaryDataLoading = useSelector(selectIsQuestionaryDataLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFirstQuizAnswear());
  }, []);

  return (
    <div className={styles.Game_Container}>
      {isQuestionaryDataLoading && <Loader />}
      {!isQuestionaryDataLoading && <Game />}
    </div>
  );
}

export default Home;
