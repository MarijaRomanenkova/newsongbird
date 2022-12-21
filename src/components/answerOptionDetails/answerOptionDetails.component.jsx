import React, { useContext, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';

import { QuizContext } from 'contexts/quizContext';

import styles from './answerOptionDetails.module.scss';

function AnswerOptionDetails({ image, name, description, species, audio }) {
  const [QuizState] = useContext(QuizContext);
  const { isCorrectAnswerSelected } = QuizState;
  const AudioPlayerREF = useRef();
  const pauseAudioPlayer = () => {
    AudioPlayerREF.current.audio.current.pause();
  };

  if (isCorrectAnswerSelected) {
    pauseAudioPlayer();
  }

  return (
    <div className={styles.AnswerOptionDetails_Container}>
      <img
        className={styles.AnswerOptionDetails_Image}
        src={image}
        alt={name}
      />
      <div>
        <h2 className={styles.AnswerOptionDetails_Name_Text}>{name}</h2>
        <h4 className={styles.AnswerOptionDetails_Species_Text}>{species}</h4>
        <AudioPlayer
          layout="horizontal-reverse"
          src={audio}
          autoPlay={false}
          autoPlayAfterSrcChange={false}
          showJumpControls={false}
          showFilledProgress
          customAdditionalControls={[]}
          customVolumeControls={[]}
          ref={AudioPlayerREF}
        />
      </div>
      <div className={styles.AnswerOptionDetails_Description}>
        {description}
      </div>
    </div>
  );
}

export default AnswerOptionDetails;
