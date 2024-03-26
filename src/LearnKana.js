import React, { useState, useEffect } from 'react';

const characters = {
  hiragana: ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ'], // Add more hiragana characters as needed
  katakana: ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ'], // Add more katakana characters as needed
};

const LearnKana = () => {
  const [selectedType, setSelectedType] = useState('hiragana');
  const [currentCharacter, setCurrentCharacter] = useState('');
  const [options, setOptions] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Load score from localStorage
    const savedScore = localStorage.getItem('kanaScore');
    if (savedScore) {
      setScore(parseInt(savedScore));
    }
    // Generate initial character
    generateCharacter();
  }, []);

  useEffect(() => {
    // Save score to localStorage
    localStorage.setItem('kanaScore', score);
  }, [score]);

  const generateCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters[selectedType].length);
    const character = characters[selectedType][randomIndex];
    setCurrentCharacter(character);
    const shuffledOptions = shuffleArray([...characters[selectedType]]);
    setOptions(shuffledOptions.slice(0, 3)); // Choose 3 random options
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleOptionClick = (option) => {
    if (option === currentCharacter) {
      setScore(score + 1);
    }
    generateCharacter();
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <h1>Learn Hiragana and Katakana</h1>
      <div>
        <button onClick={() => setSelectedType('hiragana')}>Hiragana</button>
        <button onClick={() => setSelectedType('katakana')}>Katakana</button>
      </div>
      <div>
        <h2>Character: {currentCharacter}</h2>
        <div>
          {options.map((option, index) => (
            <button key={index} onClick={() => handleOptionClick(option)}>{option}</button>
          ))}
        </div>
        <div>
          <input type="text" value={userInput} onChange={handleInputChange} />
          <button onClick={() => handleOptionClick(userInput)}>Submit</button>
        </div>
      </div>
      <div>
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default LearnKana;
