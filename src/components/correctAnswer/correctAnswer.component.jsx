import React, { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  selectIsCorrectAnswerChosen,
  selectCorrectAnswerID,
  selectBirdsData,
  selectCurrentLevel,
} from 'store/gameSlice';
import imageHiddenCorrectAnswerJPG from 'assets/imageHiddenCorrectAnswerJPG.jpg';

import styles from 'components/correctAnswer/correctAnswer.module.scss';

const HIDDEN__ANSWER = '******';

function CorrectAnswer() {
  const { i18n } = useTranslation();
  // eslint-disable-next-line prefer-destructuring
  const language = i18n.language;
  const correctAnswerID = useSelector(selectCorrectAnswerID);
  const birdsData = useSelector(selectBirdsData);
  console.log(birdsData)
  const currentLevel = useSelector(selectCurrentLevel);

  const correctAnswerObject =
    birdsData[language][currentLevel].find(
      (option) => option.id === correctAnswerID
    ) || {};

    console.log(correctAnswerObject);

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
      {correctAnswerObject && (
        <>
          <img
            className={styles.correctAnswer_Image}
            src={answerToRender.image}
            alt={answerToRender.alt}
          />
          <div className={styles.correctAnswer_Box}>
            <h1 className={styles.correctAnswer_Title}>
              {answerToRender.name}
            </h1>

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
        </>
      )}
    </div>
  );
}

export default CorrectAnswer;
