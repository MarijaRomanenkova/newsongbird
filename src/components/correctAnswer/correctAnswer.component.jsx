import React, { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { useSelector } from 'react-redux';

import {
  selectIsCorrectAnswerSelected,
  selectCurrentCorrectAnswerObject,
  selectIsLoading,
} from 'store/gameSlice';
import imageHiddenCorrectAnswerJPG from 'assets/imageHiddenCorrectAnswerJPG.jpg';

import styles from 'components/correctAnswer/correctAnswer.module.scss';

const HIDDEN__ANSWER = '******';

function CorrectAnswer() {
  const isLoading = useSelector(selectIsLoading);
  const correctAnswer = useSelector(selectCurrentCorrectAnswerObject);

  const isCorrectAnswerSelected = useSelector(selectIsCorrectAnswerSelected);

  const AudioPlayerREF = useRef();
  const pauseAudioPlayer = () => {
    AudioPlayerREF.current.audio.current.pause();
  };

  if (isCorrectAnswerSelected) {
    pauseAudioPlayer();
  }

  let answerToRender = {
    image: imageHiddenCorrectAnswerJPG,
    name: HIDDEN__ANSWER,
    alt: 'bird',
  };

  if (isCorrectAnswerSelected) {
    answerToRender = {
      image: correctAnswer.image,
      name: correctAnswer.name,
      alt: correctAnswer.name,
    };
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (!isLoading) {
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
            src={correctAnswer.audio}
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
}

export default CorrectAnswer;
