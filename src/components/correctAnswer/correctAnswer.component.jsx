import React, { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  selectIsCorrectAnswerChosen,
  selectCurrentCategoryOptions,
  selectCorrectAnswerID,
} from 'store/gameSlice';
import imageHiddenCorrectAnswerJPG from 'assets/imageHiddenCorrectAnswerJPG.jpg';

import styles from 'components/correctAnswer/correctAnswer.module.scss';

const HIDDEN__ANSWER = '******';

function CorrectAnswer() {
  const { i18n } = useTranslation();
  const language = `_${i18n.language.toString()}`;
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

  const answerToRender = {
    image: imageHiddenCorrectAnswerJPG,
    name: HIDDEN__ANSWER,
    alt: 'bird',
  };

  if (isCorrectAnswerChosen) {
    answerToRender.image = correctAnswerObject.image;
    answerToRender.name = correctAnswerObject[`name${language}`];
    answerToRender.alt = correctAnswerObject[`name${language}`];
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
