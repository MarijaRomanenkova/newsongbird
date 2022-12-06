/* eslint-disable import/no-unresolved */
import React from 'react';
import Header from 'components/header/header.component';
import Categories from 'components/categories/categories.component';
import Question from 'components/question/question.component';
import Answer from 'components/answer/answer.component';
import GameOver from 'components/gameOver/gameOver.component';

function App() {
  return (
    <div className="App-container">
      <Header />
      <Categories />
      <Question />
      <Answer />
      <GameOver />
    </div>
  );
}
export default App;
