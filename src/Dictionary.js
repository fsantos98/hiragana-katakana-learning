import React, { useState } from 'react';

const Dictionary = () => {
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState({});
    const [inputValue, setInputValue] = useState('');

    const addWord = () => {
        // Assuming inputValue format is "word : translation"
        const [word, translation] = inputValue.split(':').map(item => item.trim());
        if (word && translation) {
            setWords([...words, { word, translation }]);
            setInputValue('');
        }
    };

    const getRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        setCurrentWord(words[randomIndex]);
    };

    const checkTranslation = (event) => {
        event.preventDefault();
        const userInput = event.target.elements.userTranslation.value.trim();
        if (userInput === currentWord.translation) {
            alert('Correct!');
        } else {
            alert('Incorrect. Try again.');
        }
    };

    return (
        <div>
            <h1>Dictionary</h1>
            <div>
                <label>
                    Add Word/Phrase: 
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)} 
                    />
                </label>
                <button onClick={addWord}>Add</button>
            </div>
            <div>
                <button onClick={getRandomWord}>Get Random Word</button>
                {currentWord.word && (
                    <div>
                        <h2>{currentWord.word}</h2>
                        <form onSubmit={checkTranslation}>
                            <input type="text" name="userTranslation" />
                            <button type="submit">Check Translation</button>
                        </form>
                    </div>
                )}
            </div>
            <div>
                <h2>Dictionary</h2>
                <ul>
                    {words.map((word, index) => (
                        <li key={index}>{word.word} - {word.translation}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dictionary;
