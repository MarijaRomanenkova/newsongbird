/* eslint-disable import/no-unresolved */
import React, { useContext, useRef } from 'react';
import { QuestionContext } from 'contexts/questionContext';
import AudioPlayer from 'react-h5-audio-player';

import styles from 'components/answerDetails/answerDetails.module.scss';

function AnswerDetails(props) {
  const { image, name, description, species, audio } = props;
  const [questionState] = useContext(QuestionContext);
  const { isCorrectAnswer } = questionState.isCorrectAnswer || {};
  const player = useRef();
  const pausePlayer = () => {
    player.current.audio.current.pause();
  };

  if (isCorrectAnswer === true) {
    pausePlayer();
  }

  return (
    <div className={styles.AnswerDetails_Container}>
      <img className={styles.AnswerDetails_Image} src={image} alt={`${name}`} />
      <div>
        <h2 className={styles.AnswerDetails_Name_Text}>{name}</h2>
        <h4 className={styles.AnswerDetails_Species_Text}>{species}</h4>
        <AudioPlayer
          layout="horizontal-reverse"
          src={audio}
          autoPlay={false}
          autoPlayAfterSrcChange={false}
          showJumpControls={false}
          showFilledProgress
          customAdditionalControls={[]}
          customVolumeControls={[]}
          ref={player}
        />
      </div>
      <div className={styles.AnswerDetails_Description}>{description}</div>
    </div>
  );
}

export default AnswerDetails;
