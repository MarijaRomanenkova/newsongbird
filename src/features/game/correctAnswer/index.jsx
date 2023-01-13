import React, { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { useSelector } from 'react-redux';

import {
  selectIsCorrectAnswerChosen,
  selectCurrentCategoryOptions,
  selectCorrectAnswerID,
} from 'features/game/gameSlice';
import imageHiddenCorrectAnswerJPG from 'shared/assets/imageHiddenCorrectAnswerJPG.jpg';

import styles from './index.module.scss';

const HIDDEN__ANSWER = '******';

function CorrectAnswer() {
  const correctAnswerID = useSelector(selectCorrectAnswerID);
  const currentCategoryOptions = useSelector(selectCurrentCategoryOptions);
  const correctAnswerObject =
    currentCategoryOptions.find((option) => option.id === correctAnswerID) ||
    {};

  const isCorrectAnswerChosen = useSelector(selectIsCorrectAnswerChosen);

  const AudioPlayerREF = useRef();
  const pauseAudioPlayer = () => {
    AudioPlayerREF.current.audio.current.pause();
  };

  if (isCorrectAnswerChosen) {
    pauseAudioPlayer();
  }

  let answerToRender = {
    image: imageHiddenCorrectAnswerJPG,
    name: HIDDEN__ANSWER,
    alt: 'bird',
  };

  if (isCorrectAnswerChosen) {
    answerToRender = {
      image: correctAnswerObject.image,
      name: correctAnswerObject.name,
      alt: correctAnswerObject.name,
    };
  }

  return (
    <div className={styles.correctAnswer_Container}>
      <img
        className={styles.correctAnswer_Image}
        src={answerToRender.image}
        alt={answerToRender.alt}
      />
      <div className={styles.correctAnswer_Box}>
        <h1 className={styles.correctAnswer_Title}>{answerToRender.name}</h1>

        <AudioPlayer
          layout="horizontal-reverse"
          src={correctAnswerObject.audio}
          autoPlay={false}
          autoPlayAfterSrcChange={false}
          showJumpControls={false}
          showFilledProgress
          volumeControls
          customAdditionalControls={[]}
          customVolumeControls={[]}
          ref={AudioPlayerREF}
        />
      </div>
    </div>
  );
}

export default CorrectAnswer;
