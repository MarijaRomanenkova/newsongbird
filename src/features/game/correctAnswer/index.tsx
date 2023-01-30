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
  const currentLevel: number = useAppSelector(selectCurrentLevel);
  const birdsData = useAppSelector(selectBirdsData);
  const correctAnswerID: number = useAppSelector(selectCorrectAnswerID);
  const isCorrectAnswerChosen: boolean = useAppSelector(
    selectIsCorrectAnswerChosen
  );
  const currentCategoryOptionsByLanguage: BirdsDataByLanguage =
    birdsData[language];

  let currentCategoryOptions: AnswerOptionsArray | [] = [];
  let correctAnswerObject: Option | {} = {};
  function findCurrentLevelByIndex(option: Option, index: number): boolean {
    return index === currentLevel;
  }

  if (currentCategoryOptionsByLanguage && currentLevel) {
    currentCategoryOptions = currentCategoryOptionsByLanguage.find(
      (option: Option, index: number): number =>
        findCurrentLevelByIndex(option, index)
    );
    correctAnswerObject = currentCategoryOptions.find(
      (option: Option): boolean => option.id === correctAnswerID
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
