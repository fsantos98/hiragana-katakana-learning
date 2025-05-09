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
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [notification, setNotification] = useState(''); // State for pop-up notification
    const [solutionEnabled, setSolutionEnabled] = useState(false); // State for enabling the solution button
    const [blockInput, setblockInput] = useState(false); // State for enabling the solution button
    const [isModalOpen, setIsModalOpen] = useState(false); // Track if the modal is open
    const [wordToDelete, setWordToDelete] = useState(null); // Track the word to delete
    const [sound, setSound] = useState(''); // State for the sound input

    // Load words from local storage on component mount
    useEffect(() => {
        const storedWords = JSON.parse(localStorage.getItem('dictionaryWords')) || [];
        setWords(storedWords);
    }, []);

    // Save words to local storage whenever the words array changes
    useEffect(() => {
        localStorage.setItem('dictionaryWords', JSON.stringify(words));
    }, [words]);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification('')
                setblockInput(false); // Re-enable input after 2 seconds
            }, 2000); // Clear notification after 2 seconds
            return () => clearTimeout(timer); // Cleanup timer
        }
    }, [notification]);

    const addWord = (event) => {
        event.preventDefault();

        if (!englishWord) {
            setErrorMessage('Please provide an English word.'); // Set error message
            return;
        }

        if (!japaneseWord) {
            setErrorMessage('Please provide a Japanese word.'); // Set error message
            return;
        }

        if (!sound) {
            setErrorMessage('Please provide a sound for the word.'); // Set error message
            return;
        }

        const wordExists = words.some(
            (word) =>
                word.word.toLowerCase() === englishWord.trim().toLowerCase() &&
                word.translation.toLowerCase() === japaneseWord.trim().toLowerCase()
        );

        if (wordExists) {
            setErrorMessage('This word already exists in the dictionary.');
            return;
        }

        const newWord = {
            word: englishWord.trim(),
            translation: japaneseWord.trim(),
            sound: sound.trim(), // Add the sound property
            type: wordType,
            correctGuesses: 0, // Initialize correct guesses
            incorrectGuesses: 0, // Initialize incorrect guesses
        };
        setWords([newWord, ...words]);
        setEnglishWord('');
        setJapaneseWord('');
        setSound(''); // Clear the sound input
        setWordType(WordTypes.WORD);
        setErrorMessage('');
    };

    const deleteWord = (index) => {
        const updatedWords = words.filter((_, i) => i !== index);
        setWords(updatedWords);
    };

    const getRandomWord = () => {
        if (words.length === 0) {
            setErrorMessage('No words available. Please add some words first.'); // Set error message
            return;
        }
        const randomIndex = Math.floor(Math.random() * words.length);
        setCurrentWord(words[randomIndex]); // Set the current word
        setErrorMessage(''); // Clear any previous error message
        setSolutionEnabled(false); // Disable the solution button for the new word
        setNotification(''); // Clear any previous notification
    };

    const checkTranslation = (event) => {
        event.preventDefault();
        const userInput = event.target.elements.userTranslation.value.trim().toLowerCase();
        const updatedWords = [...words];

        setblockInput(true); // Block input while processing

        if (userInput === currentWord.word.toLowerCase()) { // Compare to the English version
            setNotification({ message: 'Correct! 🎉', color: 'green' });

            // Increment correct guesses for the current word
            const wordIndex = updatedWords.findIndex((word) => word.translation === currentWord.translation);
            if (wordIndex !== -1) {
                updatedWords[wordIndex].correctGuesses += 1;
            }

            setSolutionEnabled(false);
            event.target.reset();

            // Timer for correct guess (0.5s)
            setTimeout(() => {
                setNotification('');
                setblockInput(false); // Re-enable input after notification clears
                getRandomWord(); // Fetch a new random word
            }, 500);
        } else {
            setNotification({ message: 'Incorrect. Try again.', color: 'red' });

            // Increment incorrect guesses for the current word
            const wordIndex = updatedWords.findIndex((word) => word.translation === currentWord.translation);
            if (wordIndex !== -1) {
                updatedWords[wordIndex].incorrectGuesses += 1;
            }

            setSolutionEnabled(true);

            // Timer for incorrect guess (2s)
            setTimeout(() => {
                setNotification('');
                setblockInput(false); // Re-enable input after notification clears
            }, 2000);
        }

        setWords(updatedWords); // Update the words state
    };

    const showSolution = () => {
        setNotification({ message: `The correct translation is: ${currentWord.translation}`, color: 'orange' });
    };

    const openDeleteModal = (index) => {
        setWordToDelete(index); // Set the word to delete
        setIsModalOpen(true); // Open the modal
    };

    const resetWinRates = () => {
        const updatedWords = words.map((word) => ({
            ...word,
            correctGuesses: 0,
            incorrectGuesses: 0,
        }));
        setWords(updatedWords); // Update the words state
        setNotification({ message: 'Win rates have been reset!', color: 'blue' }); // Show a notification
    };

    return (
        <div className="dictionary-container">
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Are you sure you want to delete this word?</p>
                        <div className="modal-actions">
                            <button
                                onClick={() => {
                                    deleteWord(wordToDelete);
                                    setIsModalOpen(false);
                                }}
                                className="confirm-button"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="cancel-button"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <h1 className="dictionary-title">Language Learning Dictionary</h1>

            {/* Random Word Section */}
            <div className="random-word-section">
                {notification && (
                    <div
                        className="notification-popup"
                        style={{ backgroundColor: notification.color }}
                    >
                        <p>{notification.message}</p>
                    </div>
                )}
                <h2 className="section-title">Get a Random Word</h2>
                <button onClick={getRandomWord} className="random-word-button">Get Random Word</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
                {currentWord.translation && (
                    <div className="random-word-display">
                        <h3 className="random-word">{currentWord.translation}</h3> {/* Display Japanese word */}
                        <form onSubmit={checkTranslation} className="check-translation-form">
                            <input
                                type="text"
                                name="userTranslation"
                                placeholder="Enter English Translation"
                                className="input-field"
                            />
                            <button
                                type="submit"
                                className="check-button"
                                disabled={blockInput} // Disable button while blocked
                            >
                                Check Translation
                            </button>
                        </form>
                        <button
                            onClick={showSolution}
                            className="solution-button"
                            disabled={!solutionEnabled} // Disable the button if not enabled
                        >
                            Show Solution
                        </button>
                    </div>
                )}
            </div>

            {/* Add Word Section */}
            <div className="form-container">
                <h2 className="section-title">Add a New Word</h2>
                <form onSubmit={addWord} className="add-word-form">
                    <input
                        type="text"
                        placeholder="Japanese Word"
                        value={japaneseWord}
                        onChange={(e) => setJapaneseWord(e.target.value)}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Sound (e.g., kuma)"
                        value={sound}
                        onChange={(e) => setSound(e.target.value)}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="English Word"
                        value={englishWord}
                        onChange={(e) => setEnglishWord(e.target.value)}
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
                <div className="dictionary-controls">
                    <button onClick={resetWinRates} className="reset-button">Reset Win Rates</button>
                </div>
                <table className="dictionary-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Japanese</th>
                            <th>Sound</th> {/* New column for sound */}
                            <th>English</th>
                            <th>Win Rate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {words.map((word, index) => {
                            const totalGuesses = word.correctGuesses + word.incorrectGuesses;
                            const winRate = totalGuesses > 0 ? Math.round((word.correctGuesses / totalGuesses) * 100) : 0;

                            return (
                                <tr key={index}>
                                    <td>{word.type}</td>
                                    <td className="japanese-text">{word.translation}</td>
                                    <td>{word.sound}</td> {/* Display the sound */}
                                    <td>{word.word}</td>
                                    <td>
                                        <div
                                            className="win-rate-box"
                                            style={{
                                                background: `linear-gradient(to right, green ${totalGuesses === 0 ? 100 : winRate}%, red ${totalGuesses === 0 ? 100 : winRate}%)`,
                                            }}
                                        >
                                            {winRate}% ({word.correctGuesses}/{totalGuesses})
                                        </div>
                                    </td>
                                    <td>
                                        <i
                                            className="delete-icon"
                                            onClick={() => openDeleteModal(index)}
                                            title="Delete"
                                        >🗑️</i>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dictionary;