import React, { useRef } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import { useAppSelector } from 'app/hooks';

import { selectIsCorrectAnswerChosen } from 'features/game/gameSlice';

import styles from './index.module.scss';

type Props = {
  image: string;
  name: any;
  species: string;
  description: string;
  audio: string;
  styles?: string;
};

const AnswerOptionDetails = ({
  image,
  name,
  description,
  species,
  audio,
  styles,
}: Props) => {
  const isCorrectAnswerChosen: boolean = useAppSelector(
    selectIsCorrectAnswerChosen
  );

  const AudioPlayerREF: any = useRef < H5AudioPlayer > null;
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
        src={image}
        alt={name}
      />
      <div>
        <h2 className={styles.AnswerOptionDetails_Name_Text}>{name}</h2>
        <h4 className={styles.AnswerOptionDetails_Species_Text}>{species}</h4>
        {audio && (
          <H5AudioPlayer
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
        )}
      </div>
      <div className={styles.AnswerOptionDetails_Description}>
        {description}
      </div>
    </div>
  );
};

export default AnswerOptionDetails;
