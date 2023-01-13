import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Game from 'features/game/index';
import Loader from 'shared/ui/loader';
import {
  selectIsQuestionaryDataLoading,
  selectCorrectAnswerID,
  getBirdsData,
} from 'features/game/gameSlice';

import styles from './index.module.scss';

function Home() {
  const isQuestionaryDataLoading = useSelector(selectIsQuestionaryDataLoading);
  const correctAnswerID = useSelector(selectCorrectAnswerID);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBirdsData());
  }, []);

  return (
    <div className={styles.Game_Container}>
      {(isQuestionaryDataLoading === true || correctAnswerID === 0) && (
        <Loader />
      )}
      {correctAnswerID !== 0 && <Game />}
    </div>
  );
}

export default Home;
