import React, { useState, useEffect } from 'react';
import './Dictionary.css'; // Import external CSS for better styling

const Dictionary = () => {
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState({});
    const [englishWord, setEnglishWord] = useState('');
    const [japaneseWord, setJapaneseWord] = useState('');

    // Load words from local storage on component mount
    useEffect(() => {
        const storedWords = JSON.parse(localStorage.getItem('dictionaryWords')) || [];
        setWords(storedWords);
    }, []);

    // Save words to local storage whenever the words array changes
    useEffect(() => {
        localStorage.setItem('dictionaryWords', JSON.stringify(words));
    }, [words]);

    const addWord = (event) => {
        event.preventDefault();
        if (englishWord.trim() && japaneseWord.trim()) {
            const newWord = { word: englishWord.trim(), translation: japaneseWord.trim() };
            setWords([newWord, ...words]); // Add new word to the beginning of the array
            setEnglishWord('');
            setJapaneseWord('');
        }
    };

    const deleteWord = (index) => {
        const updatedWords = words.filter((_, i) => i !== index);
        setWords(updatedWords);
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
        <div className="dictionary-container">
            <h1 className="dictionary-title">Language Learning Dictionary</h1>

            {/* Random Word Section */}
            <div className="random-word-section">
                <h2 className="section-title">Get a Random Word</h2>
                <button onClick={getRandomWord} className="random-word-button">Get Random Word</button>
                {currentWord.word && (
                    <div className="random-word-display">
                        <h3 className="random-word">{currentWord.word}</h3>
                        <form onSubmit={checkTranslation} className="check-translation-form">
                            <input
                                type="text"
                                name="userTranslation"
                                placeholder="Enter Translation"
                                className="input-field"
                            />
                            <button type="submit" className="check-button">Check Translation</button>
                        </form>
                    </div>
                )}
            </div>

            {/* Add Word Section */}
            <div className="form-container">
                <h2 className="section-title">Add a New Word</h2>
                <form onSubmit={addWord} className="add-word-form">
                    <input
                        type="text"
                        placeholder="English Word"
                        value={englishWord}
                        onChange={(e) => setEnglishWord(e.target.value)}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Japanese Word"
                        value={japaneseWord}
                        onChange={(e) => setJapaneseWord(e.target.value)}
                        className="input-field"
                    />
                    <button type="submit" className="add-button">Add</button>
                </form>
            </div>

            {/* Dictionary List Section */}
            <div className="dictionary-list-container">
                <h2 className="dictionary-list-title">Your Dictionary</h2>
                <ul className="dictionary-list">
                    {words.map((word, index) => (
                        <li key={index} className="dictionary-list-item">
                            <span className="word-pair">{word.word} - {word.translation}</span>
                            <button
                                onClick={() => deleteWord(index)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dictionary;