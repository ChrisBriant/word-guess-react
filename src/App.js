import {selectWord, compareWord} from './network/api';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [wordList, setWordList] = useState(null);
  const [checking, setChecking] = useState(false);
  const [score, setScore] = useState(0);
  const [guesses,setGuesses] = useState(3);
  const [gameOver, setGameOver] = useState(true);

  useEffect( () => {
    //Make call to api to load word list object
    // const params = {wordLength:4,amount:16} 
    // selectWord(params).then( res => {
    //   setWordList(res);
    // }).catch(err => {
    //   console.log('An error occurred',err);
    // });

    const dummyResponse = {
        "id": 16,
        "words": [
            "Cora",
            "durn",
            "fora",
            "doll",
            "heed",
            "trod",
            "york",
            "dowd",
            "forb",
            "doli",
            "prod",
            "snig",
            "roon",
            "hory",
            "ford",
            "fyrd"
        ]
    };
    setWordList(dummyResponse);
  },[]);

  const checkWord = async (id, word) => {
    if(!checking && !gameOver) {
      console.log(word);
      setChecking(true);
      const checkWordData = await compareWord({id, word});
      console.log('Checked data', checkWordData);
      setScore(checkWordData.score);
      const newGuesses = guesses - 1;
      setGuesses(newGuesses);
      if(newGuesses === 0) {
        setGameOver(true);
      }
      setChecking(false);
      // setTimeout(() => {
      //   console.log('Checked');
      //   setChecking(false);
      // },3000);
    }
  }

  return (
    <div className="App">
      <h1>Word Mind Challenge</h1>
      {
        wordList
        ? <div className='wordlist'>
          {
            wordList.words.map((word) => (
              <div key={word}  className={checking ? "word disabled" : "word" }>
                <p onClick={() => checkWord(wordList.id,word)}>{word}</p>
              </div>
            ))
          }
        </div>
        : <p>Loading words...</p>
      }
      <div className="score-box">
        <span>Guesses: {guesses} &nbsp;</span><span>Score: {score}</span>
      </div>
      {
        gameOver
        ? <div className='overlay'>
          <div className='game-over-box'>
            <h2>Game Over</h2>
            <p>Sorry, you have not guessed in time.</p>
            <button className='btn'>Start Again</button>
          </div>
        </div>
        : <></>
      }
    </div>
  );
}

export default App;
