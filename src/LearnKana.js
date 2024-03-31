import React, { useState, useEffect } from 'react';
import { buttonStyle } from './styles';

const characters = {
  hiragana: [
    "あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と",
    "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り",
    "る", "れ", "ろ", "わ", "を", "ん",
    "が", "ぎ", "ぐ", "げ", "ご", "ざ", "じ", "ず", "ぜ", "ぞ",
    "だ", "ぢ", "づ", "で", "ど", "ば", "び", "ぶ", "べ", "ぼ",
    "ぱ", "ぴ", "ぷ", "ぺ", "ぽ"
  ],
  romanji: [
    "a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko",
    "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to",
    "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho",
    "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri",
    "ru", "re", "ro", "wa", "wo", "n",
    "ga", "gi", "gu", "ge", "go", "za", "ji", "zu", "ze", "zo",
    "da", "ji", "dzu", "de", "do", "ba", "bi", "bu", "be", "bo",
    "pa", "pi", "pu", "pe", "po"
  ],
  katakana: [
    "ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ",
    "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト",
    "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ",
    "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ",
    "ル", "レ", "ロ", "ワ", "ヲ", "ン",
    "ガ", "ギ", "グ", "ゲ", "ゴ", "ザ", "ジ", "ズ", "ゼ", "ゾ",
    "ダ", "ヂ", "ヅ", "デ", "ド", "バ", "ビ", "ブ", "ベ", "ボ",
    "パ", "ピ", "プ", "ペ", "ポ"
  ]
};

const LearnKana = () => {
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

  const generateCharacter = () => {
    console.log("selectedType: ", selectedType)
    const randomIndex = Math.floor(Math.random() * characters[selectedType].length);
    const character = characters[selectedType][randomIndex];
    const correctAnswer = characters[selectedTypeN][randomIndex];
    const shuffledOptions = shuffleArray([...characters[selectedTypeN]]);
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
    let isCorrect = option === currentAnswer;
    // check if option is in choices
    if (!(currentCharacter in choices[selectedType])){
      choices[selectedType][currentCharacter] = {"right": 0, "wrong": 0};
    }
    setShowNotification(isCorrect ? "Correct" : "wrong - It was " + currentAnswer);
    score[selectedType + "_total"] += 1;
    if (isCorrect) {
      score[selectedType] += 1;
      setScore(score);
      choices[selectedType][currentCharacter]["right"] += 1;
    }else {
      choices[selectedType][currentCharacter]["wrong"] += 1;
    }
    if (!isCorrect){
      // wait for 4 seconds
      setTimeout(() => {
        const results = generateCharacter();
        setCurrentCharacter(results[0]);
        setCurrentAnswer(results[1]);
        setOptions(results[2]);
        setUserInput('');
    
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

  const centerContentStyles = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column', // Stack children vertically
    alignItems: 'center',
    minHeight: '100vh',
    margin: '50px',
  };

  const centerContentStyle2 = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const characterDisplayStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column', // Stack children vertically
    textAlign: 'center',
    padding: '20px',
    border: '2px solid #333',
    borderRadius: '10px',
    backgroundColor: '#f0f0f0',
    maxWidth: '600px', // Adjust as needed
    width: '65%',
  };

  const buttonMultipleChoice = {
    margin: '10px',
    fontSize: '35px', // Adjust as needed
  };

  const char = {
    fontSize: '155px', // Adjust as needed
    margin: '10px 10px', 
  };

  useEffect(() => {
    const results = generateCharacter();
    setCurrentCharacter(results[0]);
    setCurrentAnswer(results[1]);
    setOptions(results[2]);
    setUserInput('');
    setChoices(choices);
  }, [selectedType]);
  
  // const selectedButtonStyle = {
  //   ...buttonStyle,
  //   backgroundColor: '#0056b3',
  // };
  
  // const disabledButtonStyle = {
  //   ...buttonStyle,
  //   backgroundColor: '#ccc',
  //   color: '#666',
  //   cursor: 'not-allowed',
  // };

  const handleStyleSelection = (option) => {
    if (selectedType === option){
      return;
    }
    setSelectedTypeN(selectedType);
    setSelectedType(option);
  }

  const boxStyle = {
    height: '20px',
    margin: '0 5px', // Adjust spacing as needed
    borderRadius: '5px',
    backgroundColor: '#007bff',
  };

  const characterDisplayStyle2 = {

  };
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    padding: '7px',
    border: '2px solid #333',
    borderRadius: '10px',
    backgroundColor: '#f0f0f0',
    flexWrap: 'wrap',
    width: '56%',
    marginTop: '30px',
  };
  
  const squareStyle = (color, percentage) => ({
    width: '35px', // Adjust the size of the squares as needed
    height: '65px',
    margin: '1px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'rgb(199 199 199)',
    backgroundImage: `linear-gradient(to top, ${color} ${percentage}%, transparent ${percentage}%)`,
  });

  const bigCharStyle = {
    fontSize: '21px', // Adjust the size of the big character as needed
  };

  const smallNumberStyle = {
    fontSize: '11px', // Adjust the size of the small number as needed
  };

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

  return (
    <div style={centerContentStyles}>
      <h1>Learn Hiragana and Katakana</h1>
      <div style={centerContentStyle2}>
        <div style={characterDisplayStyle}>
          <div> {/* Add space between button group and character */}
            <button style={buttonStyle} onClick={() => handleStyleSelection('hiragana')}>Hiragana</button>
            <button style={buttonStyle} onClick={() => handleStyleSelection('katakana')}>Katakana</button>
            <button style={buttonStyle} onClick={() => handleStyleSelection('romanji')}>Romanji</button>
            <h3>
              <span>{selectedType}</span> - <span>{selectedTypeN}</span>
            </h3>
          </div>
          <h2 style={char}>{currentCharacter}</h2>
          <div>
            {options.map((option, index) => (
              <button key={index} style={buttonMultipleChoice} onClick={() => handleOptionClick(option)}>{option}</button>
            ))}
          </div>
          <div style={{ marginTop: '20px' }}> {/* Add space between input and buttons */}
            <input type="text" value={userInput} onChange={handleInputChange} />
            <button onClick={() => handleOptionClick(userInput)}>Submit</button>
            <button onClick={() => reset()}>Reset All</button>
          </div>
          <div style={{ marginTop: '20px' }}>Score: {score[selectedType]}/{score[selectedType+"_total"]}</div> {/* Add space between buttons and score */}
          <div>(Total: {score["hiragana"] + score["katakana"]}/{attempt})</div>
          <div style={notificationStyle}>
                   {showNotification}
                  </div>
        </div>
        <div style={containerStyle}>
          {characters[selectedType].map((value, index) => (
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
