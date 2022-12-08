// TODO: remove eslint-disable
// TODO: imports order
/* eslint-disable import/no-unresolved */
import React, { useContext, useRef } from 'react';
import { QuizContext } from 'contexts/QuizContext';
import AudioPlayer from 'react-h5-audio-player';
// TODO: add more meaningful naming
import MockUp from 'assets/bird-mock-up.jpg';
import styles from 'components/question/question.module.scss';

function Question() {
  const [QuizState] = useContext(QuizContext);
  // TODO: add something specific to naming
  const question =
    QuizState.birdsData[QuizState.level][
      QuizState.correctAnswerID
    ];
  
    // TODO: remove everewhere eslint-disable
  // eslint-disable-next-line prefer-destructuring
  const isGameOver = QuizState.isGameOver;
  // eslint-disable-next-line prefer-destructuring
  const isCorrectAnswer = QuizState.isCorrectAnswer;
  // TODO: move it from Component above
  const HIDDEN__ANSWER = '******';

  // TODO: add more meaningful naming + Ref
  const player = useRef();
  const pausePlayer = () => {
    player.current.audio.current.pause();
  };

  // TODO: simplify condition
  if (isCorrectAnswer === true) {
    pausePlayer();
  }


  // TODO !isGameOver ? :
  return (
    <div
      className={
        !isGameOver ? styles.Question_Container : styles.Question_Hidden
      }
    >
      <img
        className={styles.Question_Image}
        src={QuizState.isCorrectAnswer ? question.image : MockUp}
        // TODO : simplify condition
        alt={question.name ? question.name : 'bird'}
      />
      <div className={styles.Question_Box}>
        <h1 className={styles.Question_Title}>
          {/* redo from !something ? : to something ? : */}
          {!isCorrectAnswer ? HIDDEN__ANSWER : question.name}
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
