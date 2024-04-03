import React, { useState, useEffect } from 'react';
import { buttonStyle, centerContentStyles, centerContentStyle2, characterDisplayStyle, buttonMultipleChoice, char, containerStyle, squareStyle, bigCharStyle, smallNumberStyle } from './styles';
import { Characters } from './chars';

const LearnKana = () => {
  const [inputBlocked, setInputBlocked] = useState(false);
  const [selectedType, setSelectedType] = useState('hiragana');
  const [selectedTypeN, setSelectedTypeN] = useState('romanji');
  const [currentCharacter, setCurrentCharacter] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [options, setOptions] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(JSON.parse(localStorage.getItem('kanaScore')) || {
    "hiragana": 0,
    "katakana": 0,
    "hiragana_total": 0,
    "katakana_total": 0
  });
  const [choices, setChoices] = useState(JSON.parse(localStorage.getItem('kanaChoices')) || {
    "hiragana": {},
    "katakana": {},
    "romanji": {}
  }); 
  const [attempt, setAttempt] = useState(parseInt(localStorage.getItem('kanaAttempts')) || 0);
  const [showNotification, setShowNotification] = useState("");
  const [showOptions, setShowOptions] = useState("block");
  const [lastActionTimestamp, setLastActionTimestamp] = useState(Math.floor(Date.now() / 1000));

  const generateCharacter = () => {
    console.log("selectedType: ", selectedType)
    const randomIndex = Math.floor(Math.random() * Characters[selectedType].length);
    const character = Characters[selectedType][randomIndex];
    const correctAnswer = Characters[selectedTypeN][randomIndex];
    const shuffledOptions = shuffleArray([...Characters[selectedTypeN]]);
    const finalOptions = shuffledOptions.slice(0, 6);
    if (!finalOptions.includes(correctAnswer)){
      finalOptions.pop();
      finalOptions.push(correctAnswer); 
    }
    const finalOptionsArray = shuffleArray(finalOptions);

    return [character, correctAnswer, finalOptionsArray];
  };

  useEffect(() => {
    console.log("Savind data <<<<<")
    console.log("choices: ", choices)
    localStorage.setItem('kanaScore', JSON.stringify(score));
    localStorage.setItem('kanaChoices', JSON.stringify(choices));
    localStorage.setItem('kanaAttempts', JSON.stringify(attempt));
  }, [attempt]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    // notification
    setTimeout(() => {
      setShowNotification("");
    }, 4000);
  }, [showNotification]);

  const handleOptionClick = (option) => {
    if (inputBlocked) return;
    let isCorrect = option === currentAnswer;
    // check if option is in choices
    if (!(currentCharacter in choices[selectedType])){
      choices[selectedType][currentCharacter] = {"right": 0, "wrong": 0};
    }
    setShowNotification(isCorrect ? "Correct" : "wrong - It was " + currentAnswer);
    score[  + "_total"] += 1;
    if (isCorrect) {
      score[selectedType] += 1;
      setScore(score);
      choices[selectedType][currentCharacter]["right"] += 1;
    }else {
      choices[selectedType][currentCharacter]["wrong"] += 1;
    }
    if (!isCorrect){
      // wait for 4 seconds
      setInputBlocked(true);
      setTimeout(() => {
        const results = generateCharacter();
        setCurrentCharacter(results[0]);
        setCurrentAnswer(results[1]);
        setOptions(results[2]);
        setUserInput('');
        setInputBlocked(false);
      }, 4000);
    }else{
      const results = generateCharacter();
      setCurrentCharacter(results[0]);
      setCurrentAnswer(results[1]);
      setOptions(results[2]);
      setUserInput('');
  
    }
    setChoices(choices);
    setAttempt(attempt + 1);

  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };



  useEffect(() => {
    const results = generateCharacter();
    setCurrentCharacter(results[0]);
    setCurrentAnswer(results[1]);
    setOptions(results[2]);
    setUserInput('');
    setChoices(choices);
  }, [selectedType]);
  
  const handleStyleSelection = (option) => {
    setSelectedType(option);
  }

  const getPercentage = (value) => {
    if (!(selectedType in choices)){
      return -1;
    }
    if (choices[selectedType][value] !== undefined){
      let right = choices[selectedType][value]["right"];
      let wrong = choices[selectedType][value]["wrong"];
      let total = right + wrong;
      if (right === 0){
        return 0;
      }
      return Math.round((right / total) * 100);
    }
    return -1;
  }

  const getcolor = (percentage) => {
    if (percentage === -1){
      return "gray";
    }else if (percentage > 75){
      return "green";
    }else if (percentage > 50){
      return "yellow";
    }else if (percentage > 25){
      return "orange";
    }
    return "red";
  }

  const reset = () => {
    console.log("reset")
    setScore({
      "hiragana": 0,
      "katakana": 0,
      "hiragana_total": 0,
      "katakana_total": 0
    });
    setChoices({
      "hiragana": {},
      "katakana": {},
      "romanji": {}
    });
    setAttempt(0);
  }
  const notificationStyle = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    backgroundColor: showNotification.includes("wrong") ? 'red' : 'green', // Change the background color to red (you can change it to any color you like)
    color: 'white',
    padding: '10px', // Increase padding for bigger size
    borderRadius: '10px', // Increase border radius for rounded corners

    fontSize: '30px', // Increase font size for bigger text
    display: showNotification ? 'block' : 'none'
  }
  const getValue = (value, side) => {
    if (choices[selectedType][value] !== undefined){
      if (side === "right"){
        return choices[selectedType][value]["right"];
      }
      return choices[selectedType][value]["wrong"];
    }
    return 0;

  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleOptionClick(userInput);
    }
  };

  return (
    <div style={centerContentStyles}>
      <h1>Learn Hiragana and Katakana</h1>
      <div style={centerContentStyle2}>
        <div style={characterDisplayStyle}>
          <div> {/* Add space between button group and character */}
            <button style={buttonStyle} onClick={() => handleStyleSelection('hiragana')}>Hiragana</button>
            <button style={buttonStyle} onClick={() => handleStyleSelection('katakana')}>Katakana</button>
            <h3>
              <span>{selectedType}</span> - <span>{selectedTypeN}</span>
            </h3>
          </div>
          <h2 style={char}>{currentCharacter}</h2>
          <p style={{margin: '0px'}}><input onClick={() => {
            console.log("teste");
            let optionCurrent = showOptions === "block" ? "none" : "block";
            setShowOptions(optionCurrent);
            }} type="checkbox" id="options" name="options" value="options" />
          <span>Hide options</span></p>
          <div style={{display: showOptions}}>
            {options.map((option, index) => (
              <button disabled={inputBlocked} key={index} style={buttonMultipleChoice} onClick={() => handleOptionClick(option)}>{option}</button>
            ))}
          </div>
          <div style={{ marginTop: '20px' }}> {/* Add space between input and buttons */}
            <input type="text" value={userInput} onChange={handleInputChange} onKeyDown={handleKeyDown} />
            <button disabled={inputBlocked} onClick={() => handleOptionClick(userInput)}>Submit</button>
            <button onClick={() => reset()}>Reset All</button>
          </div>
          <div style={{ marginTop: '20px' }}>Score: {score[selectedType]}/{score[selectedType+"_total"]}</div> {/* Add space between buttons and score */}
          <div>(Total: {score["hiragana"] + score["katakana"]}/{attempt})</div>
          <div style={notificationStyle}>
                   {showNotification}
                  </div>
        </div>
        <div style={containerStyle}>
          {Characters[selectedType].map((value, index) => (
            <div key={index} style={{ ...squareStyle(getcolor(getPercentage(value)), getPercentage(value)) }}>
              <div style={bigCharStyle}>{value}</div>
              <div style={smallNumberStyle}>{getPercentage(value) == -1 ? 0 : getPercentage(value)}%</div>
              <div style={smallNumberStyle}>{getValue(value, "right")}/{getValue(value, "right")+getValue(value, "wrong")}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LearnKana;
