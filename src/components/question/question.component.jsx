import React, { useContext, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';

import { QuizContext } from 'contexts/QuizContext';
// TODO: add more meaningful naming
import MockUp from 'assets/bird-mock-up.jpg';
import styles from 'components/question/question.module.scss';

const HIDDEN__ANSWER = '******';

function Question() {
  const [QuizState] = useContext(QuizContext);
  // TODO: add something specific to naming
  const question =
    QuizState.birdsData[QuizState.level][QuizState.correctAnswerID];

  const { isGameOver } = QuizState;

  const { isCorrectAnswer } = QuizState;

  const AudioPlayerREF = useRef();
  const pauseAudioPlayer = () => {
    AudioPlayerREF.current.audio.current.pause();
  };

  // TODO: simplify condition
  if (isCorrectAnswer) {
    pauseAudioPlayer();
  }

  !isGameOver && return (
    <div className={styles.Question_Container}>
      <img
        className={styles.Question_Image}
        src={QuizState.isCorrectAnswer ? question.image : MockUp}
        // TODO : simplify condition
        alt={question.name ? question.name : 'bird'}
      />
      <div className={styles.Question_Box}>
        <h1 className={styles.Question_Title}>          
          {isCorrectAnswer ? question.name : HIDDEN__ANSWER }
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
          ref={AudioPlayerREF}
        />
      </div>
    </div>
  );
}
export default Question;
