import React, { useRef } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import { useAppSelector } from 'app/hooks';
import { useTranslation } from 'react-i18next';

import {
  Option,
  BirdsDataByLanguage,
  AnswerOptionsArray,
} from 'shared/interfaces';
import {
  selectIsCorrectAnswerChosen,
  selectCorrectAnswerID,
  selectBirdsData,
  selectCurrentLevel,
} from 'features/game/gameSlice';
import imageHiddenCorrectAnswerJPG from 'shared/assets/imageHiddenCorrectAnswerJPG.jpg';

import styles from './index.module.scss';

const HIDDEN__ANSWER = '******';

interface AnswerToRender {
  image: any;
  name: string;
  alt: string;
}

const CorrectAnswer: React.FC = () => {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const currentLevel = useAppSelector(selectCurrentLevel);
  const birdsData = useAppSelector(selectBirdsData);
  const correctAnswerID = useAppSelector(selectCorrectAnswerID);
  const isCorrectAnswerChosen = useAppSelector(selectIsCorrectAnswerChosen);
  const currentCategoryOptionsByLanguage = birdsData[language];

  function findCurrentLevelByIndex(
    category: string[] | AnswerOptionsArray,
    index: number
  ): boolean {
    return index === currentLevel;
  }

  let currentCategoryOptions: string[] | AnswerOptionsArray;
  let correctAnswerObject;

  if (currentCategoryOptionsByLanguage && currentLevel) {
    currentCategoryOptions = currentCategoryOptionsByLanguage.find(
      (category, index) => findCurrentLevelByIndex(category, index)
    );
    correctAnswerObject = currentCategoryOptions.find(
      (option: Option) => option.id === correctAnswerID
    );
  }

  const AudioPlayerREF: any = useRef<H5AudioPlayer>(null);
  const pauseAudioPlayer = () => {
    if (AudioPlayerREF !== null) {
      AudioPlayerREF.current.audio.current.pause();
    }
  };

  if (isCorrectAnswerChosen) {
    pauseAudioPlayer();
  }

  let answerToRender: AnswerToRender = {
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
        {correctAnswerObject.audio && (
          <H5AudioPlayer
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
        )}
      </div>
    </div>
  );
};

export default CorrectAnswer;
