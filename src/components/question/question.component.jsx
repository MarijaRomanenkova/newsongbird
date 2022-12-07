/* eslint-disable import/no-unresolved */
import React, { useContext, useRef } from 'react';
import { QuestionContext } from 'contexts/questionContext';
import AudioPlayer from 'react-h5-audio-player';
import MockUp from 'assets/bird-mock-up.jpg';
import styles from 'components/question/question.module.scss';

function Question() {
  const [questionState] = useContext(QuestionContext);
  const question =
    questionState.birdsData[questionState.level][
      questionState.randomQuestionID || {}
    ];

  const { isGameOver } = questionState.isGameOver;
  const { isCorrectAnswer } = questionState.isCorrectAnswer;
  const HIDDEN__ANSWER = '******';

  const player = useRef();
  const pausePlayer = () => {
    player.current.audio.current.pause();
  };

  if (isCorrectAnswer === true) {
    pausePlayer();
  }

  return (
    <div className={!isGameOver ? styles.Question_Container : styles.Hidden}>
      <img
        className={styles.Question_Image}
        src={questionState.isCorrectAnswer ? question.image : MockUp}
        alt={question.name !== undefined ? question.name : ''}
      />
      <div className={styles.Question_Box}>
        <h1 className={styles.Question_Title}>
          {questionState.isCorrectAnswer === false
            ? HIDDEN__ANSWER
            : question.name}
        </h1>
        <AudioPlayer
          layout="horizontal-reverse"
          src={question.audio}
          autoPlay={false}
          autoPlayAfterSrcChange={false}
          showJumpControls={false}
          showFilledProgress
          volumeControls
          customAdditionalControls={[]}
          customVolumeControls={[]}
          ref={player}
        />
      </div>
    </div>
  );
}
export default Question;
