import React, {useEffect, useRef } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';

import { useAppSelector, useAppDispatch  } from 'app/hooks';
import { selectIsCorrectAnswerChosen, selectIsGameOver, selectStopPlayingAnswerDetailsAudio, stopCorrectAnswerAudio } from 'features/game/gameSlice';


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

  const isGameOver: boolean = useAppSelector(
    selectIsGameOver
  );

  const dispatch = useAppDispatch();

  const isStopPlayingAnswerDetailsAudio = useAppSelector(selectStopPlayingAnswerDetailsAudio);

  const AudioPlayerREF: any = useRef<H5AudioPlayer>(null);
  
  const pauseAudioPlayer = () => {
    if (AudioPlayerREF !== null && AudioPlayerREF.length) {
      AudioPlayerREF.current.audio.current.pause();
      console.log('ref in pause:' , AudioPlayerREF)
    } else {
      console.log("no valid ref in correct answer")
    }
    
  };

  if (isCorrectAnswerChosen || isGameOver || isStopPlayingAnswerDetailsAudio) {
    pauseAudioPlayer();
  }
  
  useEffect(() => {
    pauseAudioPlayer();
    console.log(' Answer Details got message to pause audio:', AudioPlayerREF);
    console.log('isCorrectAnswerChosen', isCorrectAnswerChosen, AudioPlayerREF);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCorrectAnswerChosen, isGameOver ,isStopPlayingAnswerDetailsAudio]);

  const playAudio = () : void => {
    dispatch(stopCorrectAnswerAudio());
    console.log('Answer component: dispatched stopCorrectAnswerAudio', AudioPlayerREF);
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
        {currentChosenAnswerAudio && currentChosenAnswerAudio.length > 0 && (
          <H5AudioPlayer
            layout="horizontal-reverse"
            src={currentChosenAnswerAudio}
            autoPlay={false}
            onPlay={playAudio}
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
