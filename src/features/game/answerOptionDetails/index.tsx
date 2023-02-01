import React, { useRef } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';

import { selectIsCorrectAnswerChosen } from 'features/game/gameSlice';
import { useAppSelector } from 'app/hooks';

import styles from './index.module.scss';

interface AnswerOptionDetailsProps {
  currentChosenAnswerImage: string;
  currentChosenAnswerName: any;
  currentChosenAnswerSpecies: string;
  currentChosenAnswerAudio: string;
  currentChosenAnswerDescription: string;
}

function AnswerOptionDetails({
  currentChosenAnswerImage,
  currentChosenAnswerName,
  currentChosenAnswerDescription,
  currentChosenAnswerSpecies,
  currentChosenAnswerAudio,
}: AnswerOptionDetailsProps) {
  const isCorrectAnswerChosen: boolean = useAppSelector(
    selectIsCorrectAnswerChosen
  );

  const AudioPlayerREF: any = useRef<H5AudioPlayer>(null);
  const pauseAudioPlayer = () => {
    if (AudioPlayerREF !== null) {
      AudioPlayerREF.current.audio.current.pause();
    }
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
          <H5AudioPlayer
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
