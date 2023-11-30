import React, { useRef, ReactElement } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import { useTranslation } from 'react-i18next';

import {
  selectIsCorrectAnswerChosen,
  selectIsGameOver,
  selectCorrectAnswerID,
  selectBirdsData,
  selectCurrentLevel
} from 'features/game/gameSlice';
import { useAppSelector } from 'app/hooks';

import imageHiddenCorrectAnswerJPG from 'shared/assets/imageHiddenCorrectAnswerJPG.jpg';

import { Option } from 'shared/interfaces';

import styles from './index.module.scss';

const HIDDEN__ANSWER = '******';

interface AnswerToRender {
  image: any;
  name: string;
  alt: string;
}

function CorrectAnswer(): ReactElement {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const currentLevel = useAppSelector(selectCurrentLevel);
  const birdsData = useAppSelector(selectBirdsData);
  const correctAnswerID = useAppSelector(selectCorrectAnswerID);
  const isCorrectAnswerChosen = useAppSelector(selectIsCorrectAnswerChosen);
  const isGameOver = useAppSelector(selectIsGameOver);
  const currentCategoryOptionsByLanguage = birdsData[language];

  const findCurrentLevelByIndex = (index: number): boolean => index === currentLevel;

  const findCurrentObjectById = (option: Option): boolean =>
    option.id === correctAnswerID;

  let currentCategoryOptions: Option[] = [];
  let correctAnswerObject: Option = {
    name: '',
    id: 0,
    species: '',
    description: '',
    image: '',
    audio: '',
  };

  if (currentCategoryOptionsByLanguage && currentLevel) {
    currentCategoryOptions = currentCategoryOptionsByLanguage.find(
      (category: Option[], index: number) => findCurrentLevelByIndex(index)
    );
  }

  if (Array.isArray(currentCategoryOptions) && correctAnswerID > 0) {
    const result = currentCategoryOptions.find((option: Option) =>
      findCurrentObjectById(option)
    );
    if (result) {
      correctAnswerObject = result;
    }
  }

  const AudioPlayerREF: any = useRef<H5AudioPlayer>(null);
  const pauseAudioPlayer = () => {
    if (AudioPlayerREF !== null && AudioPlayerREF.length) {
      AudioPlayerREF.current.audio.current.pause();
    }
  };

  if (isCorrectAnswerChosen || isGameOver) {
    pauseAudioPlayer();
  }

  let answerToRender: AnswerToRender = {
    image: imageHiddenCorrectAnswerJPG,
    name: HIDDEN__ANSWER,
    alt: 'bird',
  };

  if (isCorrectAnswerChosen && correctAnswerObject.id) {
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
        {correctAnswerObject.audio && correctAnswerObject.audio.length > 0 && (
          <H5AudioPlayer
            layout="horizontal-reverse"
            src={correctAnswerObject.audio}
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
    </div>
  );
}

export default CorrectAnswer;
