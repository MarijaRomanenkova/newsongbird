import React, { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { useSelector } from 'react-redux';

import { selectIsCorrectAnswerChosen } from 'features/game/gameSlice';

import styles from './index.module.scss';

function AnswerOptionDetails({
  currentChosenAnswerImage,
  currentChosenAnswerName,
  currentChosenAnswerDescription,
  currentChosenAnswerSpecies,
  currentChosenAnswerAudio,
}) {
  const isCorrectAnswerChosen = useSelector(selectIsCorrectAnswerChosen);

  const AudioPlayerREF = useRef();
  const pauseAudioPlayer = () => {
    AudioPlayerREF.current.audio.current.pause();
  };

  if (isCorrectAnswerChosen) {
    pauseAudioPlayer();
  }

  return (
    <div className={styles.AnswerOptionDetails_Container}>
      <img
        className={styles.AnswerOptionDetails_Image}
        src={currentChosenAnswerImage}
        alt={currentChosenAnswerName}
      />
      <div>
        <h2 className={styles.AnswerOptionDetails_Name_Text}>
          {currentChosenAnswerName}
        </h2>
        <h4 className={styles.AnswerOptionDetails_Species_Text}>
          {currentChosenAnswerSpecies}
        </h4>
        {currentChosenAnswerAudio && (
          <AudioPlayer
            layout="horizontal-reverse"
            src={currentChosenAnswerAudio}
            autoPlay={false}
            autoPlayAfterSrcChange={false}
            showJumpControls={false}
            showFilledProgress
            customAdditionalControls={[]}
            customVolumeControls={[]}
            ref={AudioPlayerREF}
          />
        )}
      </div>
      <div className={styles.AnswerOptionDetails_Description}>
        {currentChosenAnswerDescription}
      </div>
    </div>
  );
}

export default AnswerOptionDetails;
