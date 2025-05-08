import React, { useState, useEffect } from 'react';
import './Dictionary.css'; // Import external CSS for better styling

const WordTypes = {
    WORD: 'Word',
    PHRASE: 'Phrase',
    KANJI: 'Kanji',
};

const Dictionary = () => {
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState({});
    const [englishWord, setEnglishWord] = useState('');
    const [japaneseWord, setJapaneseWord] = useState('');
    const [wordType, setWordType] = useState(WordTypes.WORD);

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
            const newWord = {
                word: englishWord.trim(),
                translation: japaneseWord.trim(),
                type: wordType,
            };
            setWords([newWord, ...words]); // Add new word to the beginning of the array
            setEnglishWord('');
            setJapaneseWord('');
            setWordType(WordTypes.WORD); // Reset type to default
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
                    <select
                        value={wordType}
                        onChange={(e) => setWordType(e.target.value)}
                        className="type-select"
                    >
                        <option value={WordTypes.WORD}>Word</option>
                        <option value={WordTypes.PHRASE}>Phrase</option>
                        <option value={WordTypes.KANJI}>Kanji</option>
                    </select>
                    <button type="submit" className="add-button">Add</button>
                </form>
            </div>

            {/* Dictionary Table Section */}
            <div className="dictionary-list-container">
                <h2 className="dictionary-list-title">Your Dictionary</h2>
                <table className="dictionary-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>English</th>
                            <th>Japanese</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {words.map((word, index) => (
                            <tr key={index}>
                                <td>{word.type}</td>
                                <td>{word.word}</td>
                                <td>{word.translation}</td>
                                <td>
                                    <button
                                        onClick={() => deleteWord(index)}
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dictionary;