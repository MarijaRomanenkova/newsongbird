import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  Fragment,
} from 'react';
import useSound from 'use-sound';

import uuid from 'react-uuid';

import { QuizContext } from 'contexts/quizContext';
import correctAnswerChosenSoundOGG from 'assets/sounds/correctAnswerChosenSound.ogg';
import incorrectAnswerChosenSoundOGG from 'assets/sounds/incorrectAnswerChosenSound.ogg';
import AnswerOptionDetails from 'components/answerOptionDetails/answerOptionDetails.component';
import Circle from 'components/circle/circle.component';
import NextButton from 'components/nextButton/nextButton.component';

import styles from './answerOptions.module.scss';

function AnswerOptions() {
  const [QuizState, dispatch] = useContext(QuizContext);

  const currentLevelAnswersOptionsArray =
    QuizState.birdsData[QuizState.currentLevel];

  const correctAnswer =
    currentLevelAnswersOptionsArray[QuizState.correctAnswerID - 1] || [];

  const { isGameOver } = QuizState;

  const [playCorrectAnswerChosenSound] = useSound(correctAnswerChosenSoundOGG);
  const [playIncorrectAnswerChosenSound] = useSound(
    incorrectAnswerChosenSoundOGG
  );

  const [chosenAnswerOption, setChosenAnswerOption] = useState({
    isClicked: false,
  });

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  const [
    currentLevelAnswersOptionsArrayStatusAdded,
    setCurrentLevelAnswersOptionsArrayStatusAdded,
  ] = useState([currentLevelAnswersOptionsArray]);

  useEffect(() => {
    setCurrentLevelAnswersOptionsArrayStatusAdded(
      currentLevelAnswersOptionsArray.map((answerOption) => {
        if (answerOption.id === correctAnswer.id)
          return {
            ...answerOption,
            isChosenAnswer: false,
            isCorrectAnswer: true,
          };
        return {
          ...answerOption,
          isChosenAnswer: false,
          isCorrectAnswer: false,
        };
      })
    );
  }, [currentLevelAnswersOptionsArray]);


  function handleAnswerOptionClick(id) {
    if (!isNextButtonDisabled) {
      return;
    }
    const currentIndex = id - 1;
    const currentAnswerOptionObject =
      currentLevelAnswersOptionsArray[currentIndex];

    setChosenAnswerOption({
      isClicked: true,
      id,
      name: currentAnswerOptionObject.name,
      species: currentAnswerOptionObject.species,
      image: currentAnswerOptionObject.image,
      audio: currentAnswerOptionObject.audio,
      description: currentAnswerOptionObject.description,
    });

    dispatch({ type: 'CHOOSE' });
    setCurrentLevelAnswersOptionsArrayStatusAdded(
      currentLevelAnswersOptionsArrayStatusAdded.map((item) => {
        if (item.id === id) {
          return { ...item, isChosenAnswer: true };
        }
        return { ...item };
      })
    );

    if (id === correctAnswer.id) {
      dispatch({ type: 'WIN' });
      playCorrectAnswerChosenSound();
      if (!isGameOver) {
        setIsNextButtonDisabled(false);
      }
    }
    playIncorrectAnswerChosenSound();
  }

  const handleNextButtonClick = () => {
    setIsNextButtonDisabled(true);
    dispatch({ type: 'NEXT_LEVEL' });
  };

  function handleKeyDown(id) {
    handleAnswerOptionClick(id);
  }

  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <>
      <div className={styles.AnswerOptions_Container}>
        <div className={styles.AnswerOptionsList_Container}>
          {currentLevelAnswersOptionsArrayStatusAdded.map((item) => (
            <Fragment key={uuid()}>
              <button
                className={styles.AnswerOptionsList_Item}
                type="button"
                value={item.id}
                tabIndex={0}
                onClick={() => handleAnswerOptionClick(item.id)}
                onKeyDown={() => handleKeyDown(item.id)}
                ref={ref}
              >
                <Circle
                  isChosenAnswer={item.isChosenAnswer}
                  isCorrectAnswer={item.isCorrectAnswer}
                />
                {item.name}
              </button>
            </Fragment>
          ))}
        </div>

        {chosenAnswerOption.isClicked && (
          <AnswerOptionDetails
            name={chosenAnswerOption.name}
            image={chosenAnswerOption.image}
            description={chosenAnswerOption.description}
            audio={chosenAnswerOption.audio}
            species={chosenAnswerOption.species}
          />
        )}
        {!chosenAnswerOption.isClicked && (
          <div className={styles.AnswerOptionDetails_Dummy}>
            <h4 className={styles.AnswerOptionDetails_Dummy_Text}>
              Послушайте плеер.
            </h4>
            <h4 className={styles.AnswerOptionDetails_Dummy_Text}>
              Выберите птицу из списка
            </h4>
          </div>
        )}
      </div>
      <NextButton
        isNextButtonDisabled={isNextButtonDisabled}
        isGameOver={isGameOver}
        handleNextButtonClick={handleNextButtonClick}
      />
    </>
  );
}

export default AnswerOptions;
