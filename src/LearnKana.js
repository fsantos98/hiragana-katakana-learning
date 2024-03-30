import React, { useState, useEffect } from 'react';

const characters = {
  hiragana: [
    "あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と",
    "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り",
    "る", "れ", "ろ", "わ", "を", "ん", "ゃ", "ゅ", "ょ", "ぁ", "ぃ", "ぅ", "ぇ", "ぉ",
    "が", "ぎ", "ぐ", "げ", "ご", "ざ", "じ", "ず", "ぜ", "ぞ",
    "だ", "ぢ", "づ", "で", "ど", "ば", "び", "ぶ", "べ", "ぼ",
    "ぱ", "ぴ", "ぷ", "ぺ", "ぽ"
  ],
  romanji: [
    "a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko",
    "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to",
    "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho",
    "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri",
    "ru", "re", "ro", "wa", "wo", "n", "ya", "yu", "yo", "a", "i", "u", "e", "o",
    "ga", "gi", "gu", "ge", "go", "za", "ji", "zu", "ze", "zo",
    "da", "ji", "dzu", "de", "do", "ba", "bi", "bu", "be", "bo",
    "pa", "pi", "pu", "pe", "po"
  ],
  katakana: [
    "ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ",
    "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト",
    "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ",
    "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ",
    "ル", "レ", "ロ", "ワ", "ヲ", "ン", "ッ", "ャ", "ュ", "ョ", "ァ", "ィ", "ゥ", "ェ", "ォ",
    "ガ", "ギ", "グ", "ゲ", "ゴ", "ザ", "ジ", "ズ", "ゼ", "ゾ",
    "ダ", "ヂ", "ヅ", "デ", "ド", "バ", "ビ", "ブ", "ベ", "ボ",
    "パ", "ピ", "プ", "ペ", "ポ"
  ]
};
const choices = [];

const LearnKana = () => {
  const [selectedType, setSelectedType] = useState('hiragana');
  const [selectedTypeN, setSelectedTypeN] = useState('romanji');
  const [currentCharacter, setCurrentCharacter] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [options, setOptions] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);

  const generateCharacter = () => {
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
    console.log("start")
    const savedScore = localStorage.getItem('kanaScore');
    if (savedScore) {
      console.log("score: ", savedScore)
      setScore(parseInt(savedScore));
    }
    const results = generateCharacter();
    setCurrentCharacter(results[0]);
    setCurrentAnswer(results[1]);
    setOptions(results[2]);
  }, [ ]);

  useEffect(() => {
    localStorage.setItem('kanaScore', score);
  }, [score]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleOptionClick = (option) => {
    choices.push(currentCharacter);
    console.log(choices)
    if (option === currentAnswer) {
      setScore(score + 1);
    }
    const results = generateCharacter();
    setCurrentCharacter(results[0]);
    setCurrentAnswer(results[1]);
    setOptions(results[2]);
    setUserInput('');

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

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '25px',
    fontWeight: 'bold',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    backgroundColor: '#007bff',
    color: '#fff',
    margin: '10px',
  };
  
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
    generateCharacter();
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
    width: '80%',
    marginTop: '30px',
  };
  
const squareStyle = {
  width: '25px', // Adjust the size of the squares as needed
  height: '60px',
  margin: '1px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor:'rgb(199 199 199)',
};

const bigCharStyle = {
  fontSize: '21px', // Adjust the size of the big character as needed
};

const smallNumberStyle = {
  fontSize: '15px', // Adjust the size of the small number as needed
};
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
          </div>
          <p style={{ marginTop: '20px' }}>Score: {score}</p> {/* Add space between buttons and score */}
        </div>
        <div style={containerStyle}>
          {characters["hiragana"].map((value, index) => (
            <div key={index} style={{ ...squareStyle }}>
              <div style={bigCharStyle}>{value}</div>
              {/* <div style={smallNumberStyle}>{index}</div> */}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LearnKana;
