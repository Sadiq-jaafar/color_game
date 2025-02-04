import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('');
  const [hasGuessed, setHasGuessed] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  const COLORS = [
    '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#008000',
    '#800000', '#008080', '#FF4500'
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newTarget = COLORS[Math.floor(Math.random() * COLORS.length)];
    const newOptions = [newTarget];
    while (newOptions.length < 6) {
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      if (!newOptions.includes(randomColor)) {
        newOptions.push(randomColor);
      }
    }
    setTargetColor(newTarget);
    setOptions(newOptions.sort(() => Math.random() - 0.5));
    setHasGuessed(false);
    setGameStatus('');
  };

  const handleGuess = (selectedColor) => {
    if (hasGuessed) return;

    if (selectedColor === targetColor) {
      setScore((prevScore) => prevScore + 1);
      setGameStatus('Correct! Well done! 🎉');
      setHasGuessed(true);
      setAnimationClass('correct-animation');
      setTimeout(() => {
        initializeGame();
        setAnimationClass('');
      }, 1000);
    } else {
      setGameStatus('Wrong! Try again. ❌');
      setAnimationClass('wrong-animation');
      setTimeout(() => setAnimationClass(''), 500);
    }
  };

  const resetGame = () => {
    setScore(0);
    initializeGame();
  };

  return (
    <div className="container">
      <div
        className={`color-box ${animationClass}`}
        style={{ backgroundColor: targetColor }}
        onAnimationEnd={() => setAnimationClass('')}
        data-testid="colorBox" 
      ></div>
      <p className="game-instructions" data-testid="gameInstructions">
        Guess the correct color that matches the box above!
      </p>
      <div className="color-options">
        {options.map((color, index) => (
          <button
            key={index}
            className="color-option"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
            disabled={hasGuessed}
            data-testid="colorOption" 
          ></button>
        ))}
      </div>
      <p className="game-status" data-testid="gameStatus">{gameStatus}</p> 
      <p className="score" data-testid="score"> 
        Score: <span>{score}</span>
      </p>
      <button className="new-game-btn" onClick={resetGame} data-testid="newGameButton">
        New Game
      </button>
    </div>
  );
}

export default App;