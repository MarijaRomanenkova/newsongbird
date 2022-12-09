import React, { useContext, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';

import { QuizContext } from 'contexts/quizContext';
import imageHiddenCorrectAnswerJPG from 'assets/imageHiddenCorrectAnswerJPG.jpg';

import styles from 'components/correctAnswer/correctAnswer.module.scss';

const HIDDEN__ANSWER = '******';

function CorrectAnswer() {
  const [QuizState] = useContext(QuizContext);
  const correctAnswer =
    QuizState.birdsData[QuizState.level][QuizState.correctAnswerID];

  const { isCorrectAnswer } = QuizState;

  const AudioPlayerREF = useRef();
  const pauseAudioPlayer = () => {
    AudioPlayerREF.current.audio.current.pause();
  };

  // TODO: simplify condition
  if (isCorrectAnswer) {
    pauseAudioPlayer();
  }

  return (
    <div className={styles.correctAnswer_Container}>
      <img
        className={styles.correctAnswer_Image}
        src={
          isCorrectAnswer ? correctAnswer.image : imageHiddenCorrectAnswerJPG
        }
        // TODO : simplify condition
        alt={correctAnswer.name ? correctAnswer.name : 'bird'}
      />
      <div className={styles.correctAnswer_Box}>
        <h1 className={styles.correctAnswer_Title}>
          {isCorrectAnswer ? correctAnswer.name : HIDDEN__ANSWER}
        </h1>
        <AudioPlayer
          layout="horizontal-reverse"
          src={correctAnswer.audio}
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
